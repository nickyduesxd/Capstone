# Literature Review

## Hybrid Low-Power Wide-Area Mesh Network for IoT Applications
https://ieeexplore.ieee.org/abstract/document/9139964

**Summary:** This paper proposes a hybrid, low-power, wide-area network (LPWAN) architecture for Internet of Things (IoT) applications that combines the advantages of sub-GHz long-range radio (LoRa) and 2.4-GHz short-range radio (ANT) protocols. The paper describes the real-world deployments of this hybrid network at the Purdue University campus (1.2 sq km) and a university-owned farm (2.2 sq km). The results demonstrate the advantages of the proposed network in terms of cost, coverage, and power consumption compared to other IoT solutions like LoRaWAN. The multi-hop LoRa mesh network was able to cover long distances (up to 3 km) with over 98% packet delivery ratio (PDR) using a lower spreading factor (SF7), in contrast to LoRaWAN which requires higher SFs for long ranges leading to higher power consumption. 

** Analysis: ** This paper took a more test oriented approach, and produced a physical solution. The way they experimented with the nodes is what we hope to do on the yard here.

## Smart Communication Using 2D and 3D Mesh Network-on-Chip

https://www.researchgate.net/profile/Hammam-Alshazly/publication/360843134_Smart_Communication_Using_2D_and_3D_Mesh_Network-on-Chip/links/6294a2e255273755ebc1f720/Smart-Communication-Using-2D-and-3D-Mesh-Network-on-Chip.pdf

** Summary: ** This paper explores the performance evaluation of 2D and 3D mesh Network-on-Chip (NoC) architectures implemented on a Virtex-5 field-programmable gate array (FPGA) and their potential benefits for embedded system design in smart wireless communication applications. The study focuses on the design, simulation, and hardware resource utilization of 2D and 3D mesh NoC topologies for different cluster sizes. Additionally, it discusses the potential advantages of the suggested NoC approach for smart wireless communication applications. The paper emphasizes the significance of NoC as a scalable solution for overcoming communication problems in System-on-Chip (SoC) designs. The paper details the simulation results for the 2D and 3D mesh NoC architectures, outlining the hardware resource utilization and timing parameters for different cluster sizes. The findings reveal the increase in hardware complexity and clock latency with the number of nodes, with the hardware utilization rising as the cluster size increases.

** Analysis: ** Architecture is going to be an important part of  our solution, since we will be building it from the ground up and will need to understand how every part of the node work, and how they work together as well as running tests like this research team did.

## Localization of Networks on 3D Terrain Surfaces

https://ieeexplore.ieee.org/abstract/document/9214891

** Summary: ** This paper explores the challenges and solutions in 3D surface network localization with terrain models. It introduces a digital terrain model (DTM), which is a 3D representation of a terrain's surface converted into a triangular mesh, and proposes fully distributed and anchor-free algorithms for aligning the meshes in the plane. The algorithms aim to map the triangular meshes extracted from the connectivity graph of a sensor network and the DTM of its deployed terrain surface to the plane. The paper evaluates the performance of the proposed algorithms under various scenarios, including the impact of the one-hop distance measurement error, the resolution of the DTM, and the situation of connectivity-only information. 
** Analysis: ** We plan to construct a 3D terrain model of the marathon route in order to run simulations, this research paper shows us one way they did that and we hope to use it.

