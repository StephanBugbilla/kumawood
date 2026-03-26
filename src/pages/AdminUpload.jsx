import { useState, useRef } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './AdminUpload.css';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { UploadCloud, FileVideo, Image as ImageIcon, Loader2 } from 'lucide-react';

const AdminUpload = () => {
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('2026');
  const [synopsis, setSynopsis] = useState('');
  const [genre, setGenre] = useState('Action / Thriller');
  const [director, setDirector] = useState('');
  
  const [posterFile, setPosterFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const posterInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handlePublish = async () => {
    if (!title || !posterFile || !videoFile) {
      setUploadStatus('Please provide at least a title, poster, and video.');
      return;
    }
    
    setIsUploading(true);
    setUploadStatus('Uploading poster...');
    
    try {
      const posterRef = ref(storage, `posters/${Date.now()}_${posterFile.name}`);
      await uploadBytes(posterRef, posterFile);
      const posterUrl = await getDownloadURL(posterRef);
      
      setUploadStatus('Uploading video (this may take a while)...');
      const videoRef = ref(storage, `videos/${Date.now()}_${videoFile.name}`);
      await uploadBytes(videoRef, videoFile);
      const videoUrl = await getDownloadURL(videoRef);
      
      setUploadStatus('Saving metadata to database...');
      await addDoc(collection(db, 'movies'), {
        title,
        releaseYear,
        synopsis,
        genre,
        director,
        posterUrl,
        videoUrl,
        createdAt: new Date().toISOString()
      });
      
      setUploadStatus('Upload complete! Movie is now on Sankofa+');
      
      // Reset
      setTitle('');
      setSynopsis('');
      setDirector('');
      setPosterFile(null);
      setVideoFile(null);
      
    } catch (error) {
      console.error("Error formatting:", error);
      setUploadStatus('Error: ' + error.message);
    }
    
    setIsUploading(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1 className="admin-title">Creator Studio</h1>
        <p className="admin-subtitle">Curate and publish high-fidelity cinematic experiences to the Sankofa+ global audience.</p>
      </div>

      <div className="admin-layout">
        <div className="admin-main-column">
          
          <section className="admin-panel glass-panel">
            <h3 className="panel-header">Core Metadata</h3>
            <div className="form-row">
              <TextInput 
                label="TITLE" 
                id="m-title" 
                placeholder="A compelling title..." 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
              />
              <div className="input-group">
                <label className="input-label">RELEASE YEAR</label>
                <select className="text-input custom-select" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)}>
                  <option>2026</option>
                  <option>2025</option>
                  <option>2024</option>
                </select>
              </div>
            </div>
            
            <div className="input-group">
              <label className="input-label">SYNOPSIS</label>
              <textarea 
                className="text-input" 
                rows="4" 
                placeholder="Draft a compelling one-shot synopsis..."
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
              ></textarea>
            </div>
            
            <div className="form-row">
              <div className="input-group">
                <label className="input-label">GENRES</label>
                <select className="text-input custom-select" value={genre} onChange={(e) => setGenre(e.target.value)}>
                  <option>Action / Thriller</option>
                  <option>Drama</option>
                  <option>Sci-Fi</option>
                  <option>Comedy</option>
                </select>
              </div>
              <TextInput 
                label="DIRECTOR / CREATOR" 
                id="m-director" 
                placeholder="e.g. Kwadwo Nkansah" 
                value={director}
                onChange={(e) => setDirector(e.target.value)}
              />
            </div>
          </section>

          <section className="admin-panel glass-panel">
            <h3 className="panel-header">Media Assets</h3>
            <div className="upload-zones">
              <div className="upload-zone" onClick={() => posterInputRef.current?.click()}>
                <input type="file" accept="image/*" hidden ref={posterInputRef} onChange={(e) => setPosterFile(e.target.files[0])} />
                <ImageIcon size={32} className="upload-icon" />
                <h4>Movie Poster</h4>
                <p>{posterFile ? posterFile.name : "Upload a high-fidelity poster (16:9 ratio)"}</p>
              </div>
              
              <div className="upload-zone" onClick={() => videoInputRef.current?.click()}>
                <input type="file" accept="video/*" hidden ref={videoInputRef} onChange={(e) => setVideoFile(e.target.files[0])} />
                <FileVideo size={32} className="upload-icon" />
                <h4>App UI</h4>
                <p>{videoFile ? videoFile.name : "High quality .mp4 format"}</p>
              </div>
            </div>
          </section>

        </div>

        <div className="admin-side-column">
          <section className="admin-panel glass-panel publish-panel">
            <h3 className="panel-header">Staging Zone</h3>
            
            <div className="preview-card">
              <div className="preview-image-placeholder">
                {posterFile ? (
                   <img src={URL.createObjectURL(posterFile)} alt="Preview" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}} />
                ) : (
                  <>
                    <UploadCloud size={40} className="preview-icon"/>
                    <span>Preview No Selection</span>
                  </>
                )}
              </div>
            </div>

            <div className="publish-actions">
              <Button variant="primary" className="publish-btn" onClick={handlePublish} disabled={isUploading}>
                {isUploading ? <><Loader2 size={16} className="lucide-spin" style={{marginRight: '8px', animation: 'spin 1s linear infinite'}}/> Publishing...</> : "Publish to Sankofa+"}
              </Button>
              <Button variant="secondary" className="publish-btn" disabled={isUploading}>Save to Drafts</Button>
            </div>
            
            {uploadStatus && (
              <p className="publish-note" style={{color: uploadStatus.includes('Error') || uploadStatus.includes('Please') ? 'var(--color-primary)' : 'var(--color-accent)'}}>
                {uploadStatus}
              </p>
            )}

            {!uploadStatus && <p className="publish-note">• Designed upload workflow</p>}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminUpload;
