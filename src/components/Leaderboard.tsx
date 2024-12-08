import { Trophy } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text3D, Center } from "@react-three/drei";
import { useState } from "react";

const mockLeaders = [
  { username: "Player1", coins: 1500 },
  { username: "Player2", coins: 1200 },
  { username: "Player3", coins: 800 },
];

const LeaderboardItem = ({ position, data, index }: any) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 0.5, 0.1]} />
        <meshStandardMaterial 
          color={index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : "#CD7F32"} 
          opacity={0.7}
          transparent
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <Text3D
        position={[-1.8, -0.1, 0.1]}
        size={0.2}
        height={0.1}
        font="/fonts/helvetiker_regular.typeface.json"
      >
        {`${index + 1}. ${data.username}`}
        <meshStandardMaterial color="white" />
      </Text3D>
      <Text3D
        position={[1, -0.1, 0.1]}
        size={0.2}
        height={0.1}
        font="/fonts/helvetiker_regular.typeface.json"
      >
        {data.coins}
        <meshStandardMaterial color="#6C63FF" />
      </Text3D>
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Center>
        {mockLeaders.map((leader, index) => (
          <LeaderboardItem
            key={leader.username}
            position={[0, -index * 0.8, 0]}
            data={leader}
            index={index}
          />
        ))}
      </Center>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
};

const Leaderboard = () => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 w-full max-w-md">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <h2 className="text-xl font-bold text-white">Leaderboard</h2>
      </div>
      <div className="h-[300px] w-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Scene />
        </Canvas>
      </div>
    </div>
  );
};

export default Leaderboard;