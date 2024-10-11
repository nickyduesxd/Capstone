# Literature Review

## Hybrid Low-Power Wide-Area Mesh Network for IoT Applications
https://ieeexplore.ieee.org/abstract/document/9139964

**Summary:** This paper proposes a hybrid, low-power, wide-area network (LPWAN) architecture for Internet of Things (IoT) applications that combines the advantages of sub-GHz long-range radio (LoRa) and 2.4-GHz short-range radio (ANT) protocols. The paper describes the real-world deployments of this hybrid network at the Purdue University campus (1.2 sq km) and a university-owned farm (2.2 sq km). The results demonstrate the advantages of the proposed network in terms of cost, coverage, and power consumption compared to other IoT solutions like LoRaWAN. The multi-hop LoRa mesh network was able to cover long distances (up to 3 km) with over 98% packet delivery ratio (PDR) using a lower spreading factor (SF7), in contrast to LoRaWAN which requires higher SFs for long ranges leading to higher power consumption. 

**Analysis:** This paper took a more test oriented approach, and produced a physical solution. The way they experimented with the nodes is what we hope to do on the yard here.

## Smart Communication Using 2D and 3D Mesh Network-on-Chip

https://www.researchgate.net/profile/Hammam-Alshazly/publication/360843134_Smart_Communication_Using_2D_and_3D_Mesh_Network-on-Chip/links/6294a2e255273755ebc1f720/Smart-Communication-Using-2D-and-3D-Mesh-Network-on-Chip.pdf

**Summary:** This paper explores the performance evaluation of 2D and 3D mesh Network-on-Chip (NoC) architectures implemented on a Virtex-5 field-programmable gate array (FPGA) and their potential benefits for embedded system design in smart wireless communication applications. The study focuses on the design, simulation, and hardware resource utilization of 2D and 3D mesh NoC topologies for different cluster sizes. Additionally, it discusses the potential advantages of the suggested NoC approach for smart wireless communication applications. The paper emphasizes the significance of NoC as a scalable solution for overcoming communication problems in System-on-Chip (SoC) designs. The paper details the simulation results for the 2D and 3D mesh NoC architectures, outlining the hardware resource utilization and timing parameters for different cluster sizes. The findings reveal the increase in hardware complexity and clock latency with the number of nodes, with the hardware utilization rising as the cluster size increases.

**Analysis:** Architecture is going to be an important part of  our solution, since we will be building it from the ground up and will need to understand how every part of the node work, and how they work together as well as running tests like this research team did.

## Localization of Networks on 3D Terrain Surfaces

https://ieeexplore.ieee.org/abstract/document/9214891

**Summary:** This paper explores the challenges and solutions in 3D surface network localization with terrain models. It introduces a digital terrain model (DTM), which is a 3D representation of a terrain's surface converted into a triangular mesh, and proposes fully distributed and anchor-free algorithms for aligning the meshes in the plane. The algorithms aim to map the triangular meshes extracted from the connectivity graph of a sensor network and the DTM of its deployed terrain surface to the plane. The paper evaluates the performance of the proposed algorithms under various scenarios, including the impact of the one-hop distance measurement error, the resolution of the DTM, and the situation of connectivity-only information. 

**Analysis:** We plan to construct a 3D terrain model of the marathon route in order to run simulations, this research paper shows us one way they did that and we hope to use it.

## Simulating a Mobile Wireless Sensor Network Monitoring the Air Force Marathon

https://scholar.afit.edu/etd/4988/

**Summary:** This paper discusses using sensor devices on runners to collect data through a mesh network and a limited number of gateways. The simulation tests the performance of IEEE 802.15.4 physical and link models as well as Ad hoc On-Demand Distance Vector (AODV) and flooding routing protocols. The experiment results show that the flood routing protocol is able to deliver over 50% of packets in 7 out of 15 trials, and over 75% in 2 trials with 100 and 125 runners using 6.3 mW transmission power. The AODV trials performed poorly due to a flaw in the module implementation not handling link breakages properly. The average end-to-end delay of application packets ranged from 0.11 seconds with 25 runners to 7.2 seconds with 125 runners. Delay had no statistically significant changes due to transmission power. The average power consumed per mote increased across all three factors of number of runners, transmission power, and routing protocol. Power consumption appears especially sensitive to the number of runners, as increased runners led to more transmissions and receptions, driving up overall power usage.

**Analysis:** We explored the solution of having runners wear nodes for our communication system that stores medical data and this paper goes more in depth about that technology and its effectiveness.

## Security in IoT Mesh Networks Based on Trust Similarity

https://ieeexplore.ieee.org/abstract/document/9941141

**Summary:** This paper proposes a secure and sustainable trust mechanism framework for Internet of Things (IoT) Mesh networks. The key issues with trust in these networks are the lack of a trusted third party for validation, and the vulnerability of Wireless Mesh Networks (WMNs) to cooperative forwarding attacks. The framework aims to identify malicious nodes and improve node cooperation in the network. It computes direct trust based on the packet-forwarding behavior of nodes, using a two-hop acknowledgment mechanism to observe neighbor behavior in multi-radio, multi-channel networks where promiscuous mode may not work. For indirect trust, the framework aggregates recommendations using weighted Dempster-Shafer (DS) theory, where the weight is computed using a similarity mechanism that correlates the recommendations received from different neighbors. This helps mitigate badmouthing and collusion attacks, where malicious nodes provide false recommendations. The overall trust is computed as a weighted mean of direct and indirect trust, with the weight depending on the frequency of interactions with that node. Detailed evaluations show the effectiveness of the proposed approach in mitigating packet drop/modification attacks, badmouthing attacks, on-off attacks, and collusion attacks, using the ns-2 simulator. 

**Analysis:** This paper looks into security of Wireless Mesh Networks which is necessary for our project. We have to create a security system that is up to standard in order to protect medical data.

## LoRaWAN Mesh Networks: A Review and Classification of Multihop Communication

https://ieeexplore.ieee.org/abstract/document/9941141

**Sumarry:** This paper provides a review of the multihop proposals for LoRaWAN networks, with a focus on addressing key technical characteristics, intermediate device functions, and network topologies. The paper also presents a detailed overview of the LoRaWAN technology, including its physical layer, MAC layer, and security mechanisms. It then reviews the existing multihop proposals for LoRaWAN, categorizing them based on whether they use simple relay nodes or more complex routing protocols. The paper identifies two main types of intermediate devices in multihop LoRaWAN networks - relay devices and router devices. Relay devices simply forward received packets, while router devices implement routing protocols to establish multi-hop paths. The paper also discusses different network topologies enabled by the use of these intermediate devices, including relay-based, router-based, and hybrid topologies.

**Analysis:** This paper provides a background for LoRaWan networks which we used to learn more and used it to consider this as a solution.

## Privacy Preserving Multi-Party Key Exchange Protocol for Wireless Mesh Networks

https://www.mdpi.com/1424-8220/22/5/1958

**SUmmary:** This paper discusses a protocol for handover authentication with privacy preservation during the transfer of a ticket between mobile devices and access points in wireless mesh networks (WMN).  The proposed protocol uses the Diffie-Hellman method to secure the transfer of the ticket and achieve privacy preservation with minimal authentication delay. The proposed protocol is designed to offer privacy to the transfer ticket and considers only symmetric key-based operations during the handover process, resulting in minimal computational cost. It also achieves a complete handover authentication process with minimal communication cost, making it efficient for mobile users in WMN. The key contributions of the proposed protocol include the introduction of a common secret key (CSK) shared among mesh access points for encryption and decryption of transfer tickets, consideration of privacy preservation during the handover process, and the omission of involvement of a third party during handover operation. Experimental results demonstrate that the proposed protocol achieves minimum authentication delay and offers a higher level of security in comparison to existing protocols.

**Analysis:** This paper uses Diffie_Hellman method for security and authentication for mobile devices and connection to a meshed network. One of the ideas we were considering was creating the meshed network and using personal devices to connect and communicate for ease of access.