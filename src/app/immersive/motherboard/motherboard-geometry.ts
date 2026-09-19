import * as THREE from 'three';

export interface MotherboardComponents {
  root: THREE.Group;
  motherboardBase: THREE.Group;
  cpuGroup: THREE.Group;
  cpuIHS: THREE.Mesh;
  cpuLever: THREE.Group;
  ram1Group: THREE.Group;
  ram2Group: THREE.Group;
  nvmeGroup: THREE.Group;
  gpuGroup: THREE.Group;
  circuitTraces: THREE.LineSegments;
  statusLeds: THREE.Mesh[];
  disposableMaterials: THREE.Material[];
  disposableGeometries: THREE.BufferGeometry[];
}

export function createMotherboardScene(): MotherboardComponents {
  const root = new THREE.Group();
  root.name = 'MotherboardRoot';

  const disposableMaterials: THREE.Material[] = [];
  const disposableGeometries: THREE.BufferGeometry[] = [];

  const trackMat = <T extends THREE.Material>(mat: T): T => {
    disposableMaterials.push(mat);
    return mat;
  };

  const trackGeo = <T extends THREE.BufferGeometry>(geo: T): T => {
    disposableGeometries.push(geo);
    return geo;
  };

  // --- Palettes & Shared Materials ---
  const pcbMaterial = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x0a100d, // Dark matte emerald/black PCB
      roughness: 0.75,
      metalness: 0.15,
    })
  );

  const goldMaterial = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Conductive gold
      roughness: 0.3,
      metalness: 0.9,
    })
  );

  const silverNickelMaterial = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xd1d5db, // Brushed nickel/silver
      roughness: 0.25,
      metalness: 0.85,
    })
  );

  const darkAlloyMaterial = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      roughness: 0.5,
      metalness: 0.6,
    })
  );

  const chipMaterial = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.6,
      metalness: 0.2,
    })
  );

  const emeraldGlowMaterial = trackMat(
    new THREE.MeshBasicMaterial({
      color: 0x10b981,
    })
  );

  const limeGlowMaterial = trackMat(
    new THREE.MeshBasicMaterial({
      color: 0xbef264,
    })
  );

  // ==========================================
  // 1. PCB BASE (Main Motherboard substrate)
  // ==========================================
  const motherboardBase = new THREE.Group();
  motherboardBase.name = 'PCB_Base';

  // Substrate: 20 x 20 x 0.3
  const pcbGeo = trackGeo(new THREE.BoxGeometry(20, 0.3, 20));
  const pcbMesh = new THREE.Mesh(pcbGeo, pcbMaterial);
  pcbMesh.receiveShadow = true;
  motherboardBase.add(pcbMesh);

  // Mounting Holes & Rings
  const holePositions: [number, number][] = [
    [-9, -9],
    [9, -9],
    [-9, 9],
    [9, 9],
    [-9, 0],
    [9, 0],
  ];
  const ringGeo = trackGeo(new THREE.RingGeometry(0.35, 0.6, 16));
  ringGeo.rotateX(-Math.PI / 2);
  holePositions.forEach(([x, z]) => {
    const ring = new THREE.Mesh(ringGeo, silverNickelMaterial);
    ring.position.set(x, 0.16, z);
    motherboardBase.add(ring);
  });

  // Southbridge / Chipset Heatsink (Bottom Right)
  const chipsetHeatsinkGeo = trackGeo(new THREE.BoxGeometry(4.5, 0.8, 4.5));
  const chipsetHeatsink = new THREE.Mesh(chipsetHeatsinkGeo, darkAlloyMaterial);
  chipsetHeatsink.position.set(6, 0.55, 6);
  chipsetHeatsink.castShadow = true;
  chipsetHeatsink.receiveShadow = true;
  motherboardBase.add(chipsetHeatsink);

  // Heatsink fins
  for (let i = -1.8; i <= 1.8; i += 0.6) {
    const finGeo = trackGeo(new THREE.BoxGeometry(4.3, 0.4, 0.15));
    const fin = new THREE.Mesh(finGeo, silverNickelMaterial);
    fin.position.set(6, 1.0, 6 + i);
    motherboardBase.add(fin);
  }

  // VRM Heatsink Left & Top of CPU
  const vrmLeftGeo = trackGeo(new THREE.BoxGeometry(1.6, 1.2, 7));
  const vrmLeft = new THREE.Mesh(vrmLeftGeo, darkAlloyMaterial);
  vrmLeft.position.set(-6.5, 0.75, -2);
  vrmLeft.castShadow = true;
  motherboardBase.add(vrmLeft);

  const vrmTopGeo = trackGeo(new THREE.BoxGeometry(6.5, 1.2, 1.6));
  const vrmTop = new THREE.Mesh(vrmTopGeo, darkAlloyMaterial);
  vrmTop.position.set(-2, 0.75, -6.5);
  vrmTop.castShadow = true;
  motherboardBase.add(vrmTop);

  // SMD Capacitors Array near VRM
  const capGeo = trackGeo(new THREE.CylinderGeometry(0.25, 0.25, 0.6, 12));
  for (let z = -5; z <= 1; z += 0.8) {
    const cap = new THREE.Mesh(capGeo, silverNickelMaterial);
    cap.position.set(-5, 0.45, z);
    motherboardBase.add(cap);
  }

  // Circuit Traces (Procedural LineSegments)
  const traceCoords: number[] = [];
  const addTrace = (x1: number, z1: number, x2: number, z2: number) => {
    traceCoords.push(x1, 0.16, z1, x2, 0.16, z2);
  };

  // Bus lines radiating from CPU (-2, -2) to RAM (3, -2)
  for (let i = -1.5; i <= 1.5; i += 0.3) {
    addTrace(0.5, -2 + i, 2.5, -2 + i);
    addTrace(0.5, -2 + i, 0, -2 + i + (i > 0 ? 0.8 : -0.8));
  }
  // Traces from CPU to PCIe Slot (-2, 4)
  for (let i = -2; i <= 2; i += 0.4) {
    addTrace(-2 + i, 0.5, -2 + i, 2.5);
    addTrace(-2 + i, 2.5, -2 + i + (i > 0 ? 0.6 : -0.6), 3.5);
  }
  // Traces from CPU to NVMe (3, 2.5)
  for (let i = 0; i < 6; i++) {
    addTrace(0.5 + i * 0.4, 0.2, 2.2 + i * 0.2, 1.5);
  }

  const traceGeo = trackGeo(new THREE.BufferGeometry());
  traceGeo.setAttribute('position', new THREE.Float32BufferAttribute(traceCoords, 3));
  const traceMat = trackMat(
    new THREE.LineBasicMaterial({
      color: 0x38bdf8, // Electric blue bus lines
      transparent: true,
      opacity: 0.45,
    })
  );
  const circuitTraces = new THREE.LineSegments(traceGeo, traceMat);
  motherboardBase.add(circuitTraces);

  // Status Diagnostic LEDs (POST Codes)
  const statusLeds: THREE.Mesh[] = [];
  const ledGeo = trackGeo(new THREE.BoxGeometry(0.3, 0.2, 0.3));
  const ledPositions = [
    [8, 8],
    [8, 7.3],
    [8, 6.6],
    [8, 5.9],
  ];
  ledPositions.forEach(([x, z], index) => {
    const led = new THREE.Mesh(ledGeo, index === 0 ? limeGlowMaterial : emeraldGlowMaterial);
    led.position.set(x, 0.25, z);
    motherboardBase.add(led);
    statusLeds.push(led);
  });

  // I/O Backplate Connectors (Top Left)
  const ioBlockGeo = trackGeo(new THREE.BoxGeometry(2.5, 2.0, 5.5));
  const ioBlock = new THREE.Mesh(ioBlockGeo, silverNickelMaterial);
  ioBlock.position.set(-8.5, 1.15, -6.5);
  ioBlock.castShadow = true;
  motherboardBase.add(ioBlock);

  root.add(motherboardBase);

  // ==========================================
  // 2. CPU SOCKET & PROCESSOR (The Core Engine)
  // ==========================================
  // Location: (-2, 0.15, -2)
  const cpuSocketBase = new THREE.Group();
  cpuSocketBase.position.set(-2, 0.15, -2);

  // Socket Frame
  const socketFrameGeo = trackGeo(new THREE.BoxGeometry(4.4, 0.25, 4.4));
  const socketFrame = new THREE.Mesh(socketFrameGeo, darkAlloyMaterial);
  socketFrame.position.y = 0.125;
  cpuSocketBase.add(socketFrame);

  // Gold Pin Area (LGA socket)
  const pinBedGeo = trackGeo(new THREE.BoxGeometry(3.6, 0.05, 3.6));
  const pinBed = new THREE.Mesh(pinBedGeo, goldMaterial);
  pinBed.position.y = 0.26;
  cpuSocketBase.add(pinBed);

  motherboardBase.add(cpuSocketBase);

  // Retention Arm / Lever Group (rotates on hinge)
  const cpuLever = new THREE.Group();
  cpuLever.position.set(2.2, 0.25, 0); // hinge at edge of socket
  const leverRodGeo = trackGeo(new THREE.CylinderGeometry(0.08, 0.08, 4.6, 8));
  leverRodGeo.rotateX(Math.PI / 2);
  const leverRod = new THREE.Mesh(leverRodGeo, silverNickelMaterial);
  leverRod.position.set(0, 0, 0);
  cpuLever.add(leverRod);

  const leverHandleGeo = trackGeo(new THREE.CylinderGeometry(0.08, 0.08, 2.0, 8));
  leverHandleGeo.rotateZ(Math.PI / 2);
  const leverHandle = new THREE.Mesh(leverHandleGeo, silverNickelMaterial);
  leverHandle.position.set(0.9, 0, 2.3);
  cpuLever.add(leverHandle);

  cpuSocketBase.add(cpuLever);

  // The actual CPU Chip (Movable component for assembly)
  const cpuGroup = new THREE.Group();
  cpuGroup.name = 'CPU_Component';
  cpuGroup.position.set(-2, 0, -2); // target is y=0.35 in socket, start elevated

  // Green substrate carrier
  const cpuSubstrateGeo = trackGeo(new THREE.BoxGeometry(3.6, 0.12, 3.6));
  const cpuSubstrate = new THREE.Mesh(
    cpuSubstrateGeo,
    trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x047857, // Emerald substrate
        roughness: 0.6,
        metalness: 0.2,
      })
    )
  );
  cpuSubstrate.position.y = 0.06;
  cpuGroup.add(cpuSubstrate);

  // Gold contact pads underside
  const cpuGoldPadsGeo = trackGeo(new THREE.BoxGeometry(3.4, 0.02, 3.4));
  const cpuGoldPads = new THREE.Mesh(cpuGoldPadsGeo, goldMaterial);
  cpuGoldPads.position.y = -0.01;
  cpuGroup.add(cpuGoldPads);

  // Integrated Heat Spreader (IHS)
  const cpuIHSGeo = trackGeo(new THREE.BoxGeometry(3.0, 0.3, 3.0));
  const cpuIHS = new THREE.Mesh(cpuIHSGeo, silverNickelMaterial);
  cpuIHS.position.y = 0.27;
  cpuIHS.castShadow = true;
  cpuGroup.add(cpuIHS);

  // Laser Etch Die Mark (Angular Logo / Silhouette on CPU)
  const dieMarkGeo = trackGeo(new THREE.BoxGeometry(1.4, 0.02, 1.4));
  const dieMark = new THREE.Mesh(
    dieMarkGeo,
    trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x10b981,
        roughness: 0.2,
        metalness: 0.9,
      })
    )
  );
  dieMark.position.y = 0.43;
  cpuGroup.add(dieMark);

  root.add(cpuGroup);

  // ==========================================
  // 3. RAM SLOTS & DDR5 STICKS (Skills / State)
  // ==========================================
  // Slot Positions: x=3.5 & x=4.7, z spans from -5 to 1
  const ramPositions = [3.4, 4.6];

  // DIMM Sockets on Base
  ramPositions.forEach((x) => {
    const dimmSlotGeo = trackGeo(new THREE.BoxGeometry(0.5, 0.5, 6.4));
    const dimmSlot = new THREE.Mesh(dimmSlotGeo, darkAlloyMaterial);
    dimmSlot.position.set(x, 0.4, -2);
    motherboardBase.add(dimmSlot);

    // Latches on top and bottom of socket
    const latchGeo = trackGeo(new THREE.BoxGeometry(0.4, 0.4, 0.3));
    const topLatch = new THREE.Mesh(latchGeo, silverNickelMaterial);
    topLatch.position.set(x, 0.55, -5.2);
    const bottomLatch = new THREE.Mesh(latchGeo, silverNickelMaterial);
    bottomLatch.position.set(x, 0.55, 1.2);
    motherboardBase.add(topLatch);
    motherboardBase.add(bottomLatch);
  });

  const createRamStick = (name: string, targetX: number): THREE.Group => {
    const ram = new THREE.Group();
    ram.name = name;
    ram.position.set(targetX, 0, -2);

    // PCB Body
    const ramPcbGeo = trackGeo(new THREE.BoxGeometry(0.12, 1.6, 6.0));
    const ramPcb = new THREE.Mesh(ramPcbGeo, chipMaterial);
    ramPcb.position.y = 0.8;
    ram.add(ramPcb);

    // Gold Pins at bottom
    const goldPinsGeo = trackGeo(new THREE.BoxGeometry(0.14, 0.25, 5.8));
    const goldPins = new THREE.Mesh(goldPinsGeo, goldMaterial);
    goldPins.position.y = 0.125;
    ram.add(goldPins);

    // DRAM Chips on sides
    for (let z = -2.2; z <= 2.2; z += 1.1) {
      const chipGeo = trackGeo(new THREE.BoxGeometry(0.22, 0.5, 0.7));
      const chip = new THREE.Mesh(chipGeo, chipMaterial);
      chip.position.set(0, 0.7, z);
      ram.add(chip);
    }

    // Modern Heatsink Shell with angular lines
    const heatsinkGeo = trackGeo(new THREE.BoxGeometry(0.24, 1.2, 5.9));
    const heatsink = new THREE.Mesh(heatsinkGeo, darkAlloyMaterial);
    heatsink.position.y = 1.0;
    heatsink.castShadow = true;
    ram.add(heatsink);

    // Top RGB / Glow Diffuser Strip
    const rgbStripGeo = trackGeo(new THREE.BoxGeometry(0.26, 0.25, 5.9));
    const rgbStrip = new THREE.Mesh(rgbStripGeo, emeraldGlowMaterial);
    rgbStrip.position.y = 1.65;
    ram.add(rgbStrip);

    return ram;
  };

  const ram1Group = createRamStick('RAM_Stick_1', ramPositions[0]);
  const ram2Group = createRamStick('RAM_Stick_2', ramPositions[1]);
  root.add(ram1Group);
  root.add(ram2Group);

  // ==========================================
  // 4. M.2 NVMe SSD (Experience / Persistent)
  // ==========================================
  // Location: (3.5, 0.2, 3.5), rotated or horizontal
  const m2SlotBaseGeo = trackGeo(new THREE.BoxGeometry(1.6, 0.3, 0.6));
  const m2SlotBase = new THREE.Mesh(m2SlotBaseGeo, darkAlloyMaterial);
  m2SlotBase.position.set(3.5, 0.3, 1.2);
  motherboardBase.add(m2SlotBase);

  // Standoff screw at (3.5, 0.25, 5.5)
  const standoffGeo = trackGeo(new THREE.CylinderGeometry(0.2, 0.2, 0.3, 12));
  const standoff = new THREE.Mesh(standoffGeo, goldMaterial);
  standoff.position.set(3.5, 0.3, 5.5);
  motherboardBase.add(standoff);

  const nvmeGroup = new THREE.Group();
  nvmeGroup.name = 'NVMe_Component';
  nvmeGroup.position.set(3.5, 0, 3.3);

  // NVMe PCB
  const nvmePcbGeo = trackGeo(new THREE.BoxGeometry(1.3, 0.1, 4.4));
  const nvmePcb = new THREE.Mesh(
    nvmePcbGeo,
    trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x052e16,
        roughness: 0.6,
        metalness: 0.2,
      })
    )
  );
  nvmePcb.position.y = 0.3;
  nvmeGroup.add(nvmePcb);

  // Gold connector pins
  const nvmePinsGeo = trackGeo(new THREE.BoxGeometry(1.2, 0.12, 0.4));
  const nvmePins = new THREE.Mesh(nvmePinsGeo, goldMaterial);
  nvmePins.position.set(0, 0.3, -2.1);
  nvmeGroup.add(nvmePins);

  // Ridged Heatsink
  const nvmeHeatsinkGeo = trackGeo(new THREE.BoxGeometry(1.4, 0.4, 4.2));
  const nvmeHeatsink = new THREE.Mesh(nvmeHeatsinkGeo, darkAlloyMaterial);
  nvmeHeatsink.position.y = 0.55;
  nvmeHeatsink.castShadow = true;
  nvmeGroup.add(nvmeHeatsink);

  // Lime accent stripe on heatsink
  const nvmeStripeGeo = trackGeo(new THREE.BoxGeometry(0.3, 0.42, 4.0));
  const nvmeStripe = new THREE.Mesh(nvmeStripeGeo, limeGlowMaterial);
  nvmeStripe.position.set(0.3, 0.56, 0);
  nvmeGroup.add(nvmeStripe);

  root.add(nvmeGroup);

  // ==========================================
  // 5. PCIe x16 GPU EXPANSION (Projects / Visual)
  // ==========================================
  // Location on PCB: (-2, 0.4, 4.5)
  const pcieSlotGeo = trackGeo(new THREE.BoxGeometry(10.5, 0.5, 0.6));
  const pcieSlot = new THREE.Mesh(pcieSlotGeo, darkAlloyMaterial);
  pcieSlot.position.set(-2, 0.4, 4.5);
  motherboardBase.add(pcieSlot);

  // PCIe Gold slot contacts inside
  const pcieContactsGeo = trackGeo(new THREE.BoxGeometry(9.8, 0.2, 0.15));
  const pcieContacts = new THREE.Mesh(pcieContactsGeo, goldMaterial);
  pcieContacts.position.set(-2, 0.5, 4.5);
  motherboardBase.add(pcieContacts);

  // GPU Card Structure
  const gpuGroup = new THREE.Group();
  gpuGroup.name = 'GPU_Component';
  gpuGroup.position.set(-2, 0, 4.5);

  // GPU Main PCB
  const gpuPcbGeo = trackGeo(new THREE.BoxGeometry(11.0, 1.8, 0.15));
  const gpuPcb = new THREE.Mesh(gpuPcbGeo, chipMaterial);
  gpuPcb.position.y = 1.4;
  gpuGroup.add(gpuPcb);

  // PCIe connector fingers
  const gpuPinsGeo = trackGeo(new THREE.BoxGeometry(9.6, 0.35, 0.18));
  const gpuPins = new THREE.Mesh(gpuPinsGeo, goldMaterial);
  gpuPins.position.y = 0.35;
  gpuGroup.add(gpuPins);

  // Metal I/O Bracket at left end
  const gpuBracketGeo = trackGeo(new THREE.BoxGeometry(0.2, 3.2, 1.2));
  const gpuBracket = new THREE.Mesh(gpuBracketGeo, silverNickelMaterial);
  gpuBracket.position.set(-5.6, 1.7, 0.4);
  gpuGroup.add(gpuBracket);

  // Shroud / Cooler Body
  const gpuShroudGeo = trackGeo(new THREE.BoxGeometry(11.2, 2.2, 1.2));
  const gpuShroud = new THREE.Mesh(gpuShroudGeo, darkAlloyMaterial);
  gpuShroud.position.set(0, 1.6, 0.7);
  gpuShroud.castShadow = true;
  gpuGroup.add(gpuShroud);

  // Dual Cooling Fans
  [-2.6, 2.6].forEach((fanX) => {
    const fanRimGeo = trackGeo(new THREE.CylinderGeometry(1.2, 1.2, 0.3, 24));
    fanRimGeo.rotateX(Math.PI / 2);
    const fanRim = new THREE.Mesh(fanRimGeo, silverNickelMaterial);
    fanRim.position.set(fanX, 1.6, 1.25);
    gpuGroup.add(fanRim);

    const fanHubGeo = trackGeo(new THREE.CylinderGeometry(0.4, 0.4, 0.4, 16));
    fanHubGeo.rotateX(Math.PI / 2);
    const fanHub = new THREE.Mesh(fanHubGeo, emeraldGlowMaterial);
    fanHub.position.set(fanX, 1.6, 1.3);
    gpuGroup.add(fanHub);
  });

  root.add(gpuGroup);

  return {
    root,
    motherboardBase,
    cpuGroup,
    cpuIHS,
    cpuLever,
    ram1Group,
    ram2Group,
    nvmeGroup,
    gpuGroup,
    circuitTraces,
    statusLeds,
    disposableMaterials,
    disposableGeometries,
  };
}
