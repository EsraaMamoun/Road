// function MoveFinger(entities, touches) {
//     touches.filter(t => t.type === "move").forEach(t => {
//       let finger = entities[t.id];
//       if (finger && finger.position) {
//         finger.position = [
//           finger.position[0] + t.delta.pageX,
//           finger.position[1] + t.delta.pageY
//         ];
//       }
//     });
  
//     return entities;
// }

export const MoveFinger = (entities, { touches }) => {
    let moveFingerEntity = entities[1]; // Assuming the finger entity is at key 1
  
    const filteredTouches = touches ? touches.filter(touch => touch.type === 'move') : [];
  
    if (filteredTouches.length > 0) {
      // Update finger position based on the first touch
      moveFingerEntity.position = [
        filteredTouches[0].event.pageX,
        filteredTouches[0].event.pageY
      ];
    }
  
    return entities;
  };
    