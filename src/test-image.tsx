export function TestImage() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Image Test</h2>
      <img 
        src="/whatWeDo.jpg" 
        alt="Test" 
        style={{ width: '300px', height: '200px', objectFit: 'cover' }}
        onLoad={() => console.log('Test image loaded')}
        onError={(e) => console.error('Test image failed', e)}
      />
    </div>
  );
} 