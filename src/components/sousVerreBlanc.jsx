import { useEffect } from 'react'
import React from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'


const SousVerreBlanc = React.forwardRef(({ textureUrl, position }, ref) => {
  const { nodes, materials } = useGLTF('/sousVerreCarresBlanc.gltf')
  const texture = textureUrl ? useTexture(textureUrl) : null

  // Flip horizontal si texture chargée
  useEffect(() => {
    if (texture) {
      texture.wrapS = THREE.RepeatWrapping
      texture.repeat.x = -1
      texture.needsUpdate = true
    }
  }, [texture])

  return (
    <group ref={ref} position={position} rotation={[Math.PI / 2, -Math.PI, Math.PI / 2]} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plan_1.geometry}
        material={materials.Material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plan_2.geometry}
        material={materials.champsNoirs}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plan_3.geometry}
        material={texture ? undefined : materials.ArtMaterial}
      >
        {texture && <meshStandardMaterial map={texture} />}
      </mesh>
    </group>
  )
}   
)

useGLTF.preload('/sousVerreCarresBlanc.gltf')
export default SousVerreBlanc
