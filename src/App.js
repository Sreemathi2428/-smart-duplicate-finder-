import React, { useState, useRef } from 'react';

function App() {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    console.log('Files selected:', uploadedFiles.length);
    setFiles(uploadedFiles);
    setResults([]);
    event.target.value = '';
  };

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const analyzeFiles = () => {
    if (files.length < 2) {
      alert('Select at least 2 files!');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      const duplicates = [];
      for (let i = 0; i < files.length; i++) {
        for (let j = i + 1; j < files.length; j++) {
          const sim = Math.round(
            Math.min(files[i].name.length, files[j].name.length) / 
            Math.max(files[i].name.length, files[j].name.length) * 100
          );
          if (sim > 70) {
            duplicates.push({
              file1: files[i].name.slice(0, 20),
              file2: files[j].name.slice(0, 20),
              similarity: sim + '%'
            });
          }
        }
      }
      
      setResults(duplicates.length ? duplicates : ['No duplicates found!']);
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{
      margin: 0,
      padding: 0,
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '40px',
        maxWidth: '800px',
        width: '100%',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          textAlign: 'center',
          marginBottom: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px'
        }}>
          <span style={{ fontSize: '3rem' }}>🔍</span>
          <span style={{ 
            background: 'linear-gradient(45deg, #fff, rgba(255,255,255,0.8))', 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent' 
          }}>
            Smart Duplicate Finder
          </span>
        </h1>

        {/* File Upload with Hover */}
        <div 
          style={{
            border: '3px dashed rgba(255,255,255,0.5)',
            borderRadius: '20px',
            padding: '60px 30px',
            textAlign: 'center',
            marginBottom: '30px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            background: 'rgba(255,255,255,0.05)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            id="file-upload"
          />
          <label htmlFor="file-upload" style={{ display: 'block', cursor: 'pointer' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📁</div>
            <h2 style={{ 
              color: 'white', 
              fontSize: '1.8rem', 
              marginBottom: '10px' 
            }}>
              {files.length === 0 ? 'Click to select files' : `Click to add more (${files.length} files)`}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>
              Hold Ctrl/Cmd to select multiple files • Supports all formats
            </p>
          </label>
        </div>

        {/* Files List */}
        {files.length > 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.9)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <h3 style={{
              margin: '0 0 20px 0',
              color: '#1f2937',
              fontSize: '1.3rem'
            }}>
              📋 {files.length} Files Selected 
              <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                (Hold Ctrl/Cmd for multiple)
              </span>
            </h3>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {files.map((file, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  marginBottom: '12px',
                  background: '#e0f2fe',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontWeight: '600', 
                      color: '#1e40af',
                      marginBottom: '4px',
                      fontSize: '0.95rem'
                    }}>
                      {file.name.length > 25 ? file.name.slice(0,22) + '...' : file.name}
                    </div>
                    <div style={{ 
                      fontSize: '0.85rem', 
                      color: '#64748b' 
                    }}>
                      {Math.round(file.size / 1024)} KB
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    style={{
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: '16px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#dc2626';
                      e.target.style.transform = 'scale(1.1)';
                      e.target.style.boxShadow = '0 4px 12px rgba(239,68,68,0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#ef4444';
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = 'none';
                    }}
                    title="Remove file"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analyze Button with Hover */}
        {files.length > 0 && (
          <button
            onClick={analyzeFiles}
            disabled={loading}
            style={{
              width: '100%',
              padding: '18px 24px',
              background: loading 
                ? '#9ca3af' 
                : 'linear-gradient(45deg, #f87171, #10b981)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              fontSize: '1.2rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
              }
            }}
          >
            {loading 
              ? '🔄 Scanning files...' 
              : `🚀 Analyze ${files.length} Files for Duplicates`
            }
          </button>
        )}

        {/* Results */}
        {results.length > 0 && !loading && (
          <div style={{
            marginTop: '24px',
            padding: '24px',
            background: results[0] && typeof results[0] === 'object' 
              ? 'rgba(239, 68, 68, 0.15)' 
              : 'rgba(16, 185, 129, 0.15)',
            borderRadius: '16px',
            borderLeft: `5px solid ${results[0] && typeof results[0] === 'object' ? '#ef4444' : '#10b981'}`
          }}>
            <h3 style={{
              margin: '0 0 16px 0',
              color: results[0] && typeof results[0] === 'object' ? '#dc2626' : '#059669',
              fontSize: '1.3rem'
            }}>
              {results[0] && typeof results[0] === 'object' ? '🔍 Duplicates Found!' : '✅ No Duplicates!'}
            </h3>
            
            {Array.isArray(results) && results[0] && typeof results[0] === 'object' ? (
              results.map((dup, index) => (
                <div key={index} style={{
                  padding: '16px',
                  background: 'rgba(255,255,255,0.7)',
                  borderRadius: '12px',
                  marginBottom: '12px',
                  borderLeft: '4px solid #ef4444'
                }}>
                  <div style={{ fontWeight: '600', color: '#dc2626' }}>
                    {dup.file1} ↔ {dup.file2}
                  </div>
                  <div style={{ color: '#374151', fontSize: '0.95rem' }}>
                    Similarity: <strong>{dup.similarity}</strong>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ 
                color: results[0] && typeof results[0] === 'object' ? '#dc2626' : '#059669',
                margin: 0,
                fontSize: '1.1rem'
              }}>
                {results[0] || 'No duplicates found! All files unique 🎉'}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
