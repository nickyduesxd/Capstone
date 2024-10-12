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

**Sumamry:** This paper provides a review of the multihop proposals for LoRaWAN networks, with a focus on addressing key technical characteristics, intermediate device functions, and network topologies. The paper also presents a detailed overview of the LoRaWAN technology, including its physical layer, MAC layer, and security mechanisms. It then reviews the existing multihop proposals for LoRaWAN, categorizing them based on whether they use simple relay nodes or more complex routing protocols. The paper identifies two main types of intermediate devices in multihop LoRaWAN networks - relay devices and router devices. Relay devices simply forward received packets, while router devices implement routing protocols to establish multi-hop paths. The paper also discusses different network topologies enabled by the use of these intermediate devices, including relay-based, router-based, and hybrid topologies.

**Analysis:** This paper provides a background for LoRaWan networks which we used to learn more and used it to consider this as a solution.

## Privacy Preserving Multi-Party Key Exchange Protocol for Wireless Mesh Networks

https://www.mdpi.com/1424-8220/22/5/1958

**Summary:** This paper discusses a protocol for handover authentication with privacy preservation during the transfer of a ticket between mobile devices and access points in wireless mesh networks (WMN).  The proposed protocol uses the Diffie-Hellman method to secure the transfer of the ticket and achieve privacy preservation with minimal authentication delay. The proposed protocol is designed to offer privacy to the transfer ticket and considers only symmetric key-based operations during the handover process, resulting in minimal computational cost. It also achieves a complete handover authentication process with minimal communication cost, making it efficient for mobile users in WMN. The key contributions of the proposed protocol include the introduction of a common secret key (CSK) shared among mesh access points for encryption and decryption of transfer tickets, consideration of privacy preservation during the handover process, and the omission of involvement of a third party during handover operation. Experimental results demonstrate that the proposed protocol achieves minimum authentication delay and offers a higher level of security in comparison to existing protocols.

**Analysis:** This paper uses Diffie_Hellman method for security and authentication for mobile devices and connection to a meshed network. One of the ideas we were considering was creating the meshed network and using personal devices to connect and communicate for ease of access.

## Resource Allocation Approach for Optimal Routing in IoT Wireless Mesh Networks

https://ieeexplore.ieee.org/abstract/document/9591636

**Summary:** This paper introduces an optimal routing protocol for IoT Wireless Mesh Networks (WMNs) by optimizing the channel and frequency resources of the network based on mathematical calculations for resource allocation. The paper analyzes the scale and characteristics of IoT mesh networks, providing a framework to determine the required number of connections between network nodes and their channel width while ensuring minimum data transmission delay. It includes a detailed explanation of the proposed approach, particularly focusing on the mathematical model used for resource allocation. The paper outlines the steps involved in the optimization process. Also, he paper discusses the use of graph models for modeling IoT mesh networks, providing a detailed description of the network topology and mathematical apparatus for solving optimization problems.

**Analyses:** This paper deals with optimizing Masked Networks, which we will definitely include in our research project, considering what our network will be used for transmitting medical information. 

## A LoRa-Based Mesh Network for Peer-to-Peer Long-Range Communication

https://www.mdpi.com/1424-8220/21/13/4314

**Summary:** LoRa is a long-range and low-power radio technology that defines the lower physical layer, while low-power, wide-area networking protocol defines the upper layers of the network. This paper presents a study on a LoRa-based mesh network that doesn’t rely on LoRaWan and provides peer-to-peer communication between nodes without using gateways and uses a multi-hop communication system. The research team designed hardware and software prototypes and tested them. The system architecture for the nodes comprises three layers: physical, network/transport layer/ and application layer. The research team tested their system by using HTML requests and collected data on the transmissions (this data includes distance and delivery time). The team found that their proposal was very flexible and feesable.

**Analyses:** This paper proposed our chosen solution, the use of LoRa mesh network. Besides providing a in depth description of the technology, the source provides us with links to explore for the creation of our own physical nodes and network system. This includes using Radio Head for the physical and network/transport layers (https://www.airspayce.com/mikem/arduino/RadioHead/) and the microcontroller board that embeds a LoRa chip (https://heltec.org/project/wifi-loar-32/) and (https://www.semtech.com/products/wireless-rf/lora-transceivers/sx1276). If we want to physically test the mechanics of our nodes in order to provide a solution, we will reference this article.

## Flying Real-Time Network to Coordinate Disaster Relief Activities in Urban Areas

https://www.mdpi.com/1424-8220/18/5/1662

**Summary:** This article covers communication support for disaster relief activities, specifically a proposal for the use of flying witness units [FWUs] (implemented by drones) that act as nodes at different locations to provide a communication line between first responders. This paper had positive results by showing a real-time schedulability analysis  of message delivery and simulations of communication support in a physical scenario constructed with respect to a real distaster scenario. The communication system the  researchers developed has two layers of FWUS, one that followers the SAR team to enable communication between team members and the other that goes from location to location to provide a communication link between the teams. To connect the different planes and to limitthe deployments numbers of FWUs, the team used the K-means clustering algorithm to design different layering networks to optimize the robustness of the communication network. To test each of these networks, the team constructed a 3D terrain elevation map. The team concluded their research paper by highlighting the principles for using FWUs and that is how free flowing and independent the network system is.

**Analyses:** The Marine Corps Marathon location can be classified as a restricted environment with "rough terrain" (which includes tall buildings, elevation, crossing water, high visibility - lack of communication used by too many phones being connected to the same network, and sensitive nearby areas such as the Whitehouse and pentagon) that draws similarities to that created by natural disasters which is why we chose this article. In addition, we were also considering drones as a viable solution but chose otherwise since DC is a no-drone environment however it is a solution we plan to say we explored in our paper. What we found the most interesting about this article was how they tested their solution. For ours, based on the mesh network, we should also use a Machine Learning Algorithm such as K-means in order to optimize the location of our nodes based on a 3d model of the Marathon route and range and performance tests on each node.

## Fast, Effective Transmitter Placement in Wireless Mesh Networks

https://www.jstor.org/stable/43941531?searchText=%28mesh+network%29&searchUri=%2Faction%2FdoAdvancedSearch%3Fq0%3Dmesh%2Bnetwork%26f0%3Dall%26c1%3DAND%26f1%3Dall%26acc%3Don%26so%3Drel&ab_segments=0%2Fbasic_search_gsv2%2Fcontrol&refreqid=fastly-default%3A273ed810d7d9f3648a1638a79ed29f1f

**Summary:** This article addressess the challenges of designing wireless mesh networks (WMNs) to provide digital services to client devices. The paper focuses on the constraints on network service, technical characteristics of access points, and radio propagation over terrain. The research formulates and uses an optimization problem to design WMN topologies that maximize client coverage while considering backhaul network service requirements on real terrain. The technique involves the use of the Dividing RECTangles (DIRECT) algorithm to quickly find good solutions to the optimization problem. The research is validated through numerical experiments and field tests, demonstrating the capability of the technique to generate network topologies for real-world scenarios. The article discusses the use of a decision support tool that allows communications officers or network designers to solve the optimization problem, taking into account the technical characteristics and placement of access points and satisfying coverage, bandwidth, and other service standards.

**Analyses:** This article uses a mathematical theory base approach to solve the node optimization problem (based on older models) which we can use and configure to provide theoretically support to our own solution for optimizing the node placement for the Marine Corps Marathon route or use it to corraborate the data science approach through the use of the K-means algorithm or other algorithms. More importantly, this paper shows us how to approach theoretically proving our optimization algorithm.

## Fast handoff authentication of client in wirless mesh network

https://ieeexplore.ieee.org/document/10074430

**Summary:** This paper introduces a pre-distributed ticket-based authentication scheme for managing client handoff in wireless mesh networks (WMNs). Key points include the essential nature of handoff in WMNs for maintaining communication quality and reliability, the potential introduction of delays and security vulnerabilities, and the limitations of traditional public key-based authentication approaches. The proposed solution emphasizes one-way authentication, aiming to reduce computational and communication overhead compared to mutual authentication. A trusted Central Ticketing Agent (CA) is utilized to generate and distribute handoff tickets to mesh routers in advance. When a client needs to handoff, it sends a request to its home mesh router (HMR), which then shares a session key with the target foreign mesh router (FMR). The FMR authenticates the client by verifying the ticket and other information, resulting in a three-message exchange designed to minimize latency during the handoff process. The security of the handoff is maintained by the pre-distributed tickets, which cannot be reproduced without detection, protecting against external attacks, albeit incurring some storage overhead on the mesh routers.

**Analyses:** One of the main focuses of our solution is security since we will be transmitting medical information across our network. This paper is applicable in proposing a one-key authentication system that increases efficiency in transmission speed by limiting overhead. We can adopt this security system and test its reliability in our research as well as compare it to other security protocols we find.

## Design of Dynamic Traffic Grooming Algorithm in Software-Defined Wireless Mesh Networks

https://ieeexplore.ieee.org/document/7336435

**Summary:** This paper explores the integration of Software-Defined Networking (SDN) technology into Wireless Mesh Networks (WMNs). SDN separates the network control plane from the data forwarding plane, allowing for automatic control and update functions achieved by software-driven control logic. The paper highlights the importance of traffic engineering in SDN-enabled WMNs, involving the mapping of network traffic distribution to the existing physical topology to optimize resource utilization and solve network imbalance issues. The proposed dynamic traffic grooming algorithm focuses on dynamic routing problems, considering path length and link utilization to achieve load balance and reduce network congestion. The paper details the design process of the dynamic traffic grooming algorithm in SDN-enabled WMNs, focusing on the considerations of path hops and link utilization for routing establishment to achieve load balance and reduce congestion. Simulation results demonstrate the superiority of the proposed dynamic traffic grooming algorithm over traditional schemes in terms of average end-to-end throughput, end-to-end delay, and packet loss probability. The algorithm significantly improves network performance, reduces congestion, and enhances Quality of Service (QoS) levels. Also, the paper provides a detailed explanation of the parameter configuration and steps of the proposed traffic grooming algorithm. Simulation experiments in different scenarios are conducted to evaluate the algorithm's performance, showing improvements in average end-to-end throughput, packet loss probability, and delay compared to traditional routing algorithms.

**Analyses:** One of the largest issues any network has to deal with is a sudden overflow of information. In our case, that means an abundance of medical incidences being reported and sent at the same time. We will need to consider this when designing our Mesh Network and discuss what policies we have in place to counter this issue. This goes for other common network issues.

## Soft-Mesh: A Robust Routing Architecture for Hybrid SDN and Wireless Mesh Networks

https://ieeexplore.ieee.org/document/9453829

**Summary:** This paper suggests a robust routing architecture for Hybrid Software-Defined and Wireless Mesh Networks (Soft-Mesh) aimed at addressing the challenges encountered by Wireless Mesh Networks (WMNs). It introduces Software-Defined Networking (SDN) as a viable solution to the routing issues faced within WMNs. The paper presents a hybrid network topology that integrates SDN hybrid nodes and legacy nodes, with the SDN hybrid node architecture enabling the coexistence of OpenFlow forwarding for SDN communication and IP-based forwarding for legacy node communication using the traditional OLSR routing protocol. the paper compares performance metrics such as average UDP throughput, end-to-end delay, packet drop ratio, and routing overhead between the proposed Soft-Mesh architecture and existing traditional and hybrid SDN/IP routing approaches. The performance of the Soft-Mesh architecture is evaluated through simulation experiments using Mininet-WiFi for network topologies with varying numbers of nodes and different proportions of SDN hybrid and legacy nodes. The analysis demonstrates that the proposed Soft-Mesh outperforms the traditional OLSR, BATMAN, and existing hybrid SDN/IP routing approaches in terms of the considered performance metrics, providing 50% to 70% improved results as the proportion of SDN hybrid nodes increases.

**Analyses:** Software-Define Networks are something we are going to explore to connect different nodes, in our research. Efficiency and performance are key for our project because spreading medical information helps maintain the integrity of the Marathon.

## SDNMesh: An SDN Based Routing Architecture for Wireless Mesh Networks

https://ieeexplore.ieee.org/abstract/document/9149796

**Summary:** This paper presents SDNMesh, an SDN-based routing architecture designed specifically for Wireless Mesh Networks (WMNs). The paper includes detailed discussions on the background and challenges of WMNs, the principles of Software Defined Networking (SDN), the architecture of SDNMesh, and its two-phase routing strategy. Additionally, it describes the workflow and implementation details of SDNMesh, presenting the flow graph and timeline of its proposed two-phase strategy. 

**Analyses:**

## Solving the Mesh Router Nodes Placement in Wireless Mesh Networks Using Coyote Optimization Algorithm

https://ieeexplore.ieee.org/abstract/document/9755946

**Summary:** This paper presents the application of the Coyote Optimization Algorithm (COA) to solve the challenging mesh routers placement problem in Wireless Mesh Networks (WMNs). This NP-hard problem aims to find the optimal placement of mesh routers in a 2D area to maximize network connectivity and user coverage. This work implements COA and compares its performance to ten other optimization algorithms including Firefly Algorithm (FA), Genetic Algorithm (GA), Particle Swarm Optimization (PSO), Whale Optimization Algorithm (WOA), Bat Algorithm (BA), African Vulture Optimization Algorithm (AVOA), Aquila Optimizer (AO), Bald Eagle Search optimization (BES), Coronavirus herd immunity optimizer (CHIO), and Salp Swarm Algorithm (SSA). Experiments are conducted on various scenarios with different numbers of mesh clients and mesh routers, considering the key metrics of network connectivity and user coverage. The results demonstrate the effectiveness and superior performance of COA compared to the other algorithms.

**Analyses:** This research team used the Coyote Optimization Algorithm in order to optimize their location of nodes. We will consider their algorithm for when set up our own optimization problem. Also there algorithm is applied through C++ which we can definitely test on our own model.