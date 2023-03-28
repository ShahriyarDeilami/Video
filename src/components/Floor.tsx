const Floor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2, -2, 0]} receiveShadow>
      <planeGeometry args={[100, 100, 1]} />
      <meshStandardMaterial color='white' />
    </mesh>
  );
};

export default Floor;
