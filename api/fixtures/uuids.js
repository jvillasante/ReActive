'use strict';

module.exports = {
  templates: [
    0,  // Padding
    1,  // Benchmark Manquehue
    2,  // Evaluación Reunión de Obra Last Planner
    3,  // Check List 6S
    4,  // Bitácora
    5,  // Evaluación Monitores Mejora Continua
    6,  // Check List 6S Oficinas de Obra
    7,  // Prácticas Lean - Parent of 8,9,10,11,12,13
    8,  // Check List Señalética
    9,  // Checklist Seguridad, Protecciones y Resguardo
    10, // Checklist Vías de Acceso
    11, // Checklist Logísitca de Obra
    12, // Checklist Tierra, Escombros y Basura
    13, // Checklist Sello Manquehue
    14, // Evaluación Reunión de Obra Last Planner URBA
  ],
  users: [
    // Manquehue
    '63d9f499-3f8b-4a9d-9d63-3f2ccc83e980', // 0 - carlos.acuna
    '9f62563f-7509-4c39-b90c-8c5351b12c3a', // 1 - carolina.aguilera
    '8075fe6d-86d5-4360-be76-7e27c6b32bce', // 2 - carolina.mora
    '1e67ff79-8388-4a81-8c43-4617799371f4', // 3 - christián.valdes
    'df728cad-a760-4512-a6f9-207e41fd15ab', // 4 - claudio.olivares
    '3e589613-1658-4c11-8db2-aff7c59749a7', // 5 - cristian.mella
    'a9f45a1f-08e3-441d-b104-7c7610e49c05', // 6 - domingo.ramos
    '3cf9fe96-0eb2-40be-a1ac-0637fa8d1471', // 7 - eduardo.vallejos
    '6f343d10-69f9-437f-bfdd-a2c2b9434170', // 8 - francisco.diazvaldes
    'f793c4af-9d6a-49f3-9c1d-d7d394436efe', // 9 - francisco.riveros
    '6f73705d-4a8b-414a-ac8a-ec63395319cc', // 10 - gonzalo.rementeria
    '9b409311-6bba-4371-940a-b99a9c654147', // 11 - henry.gonzalez
    '1e1f7a2d-ba00-4113-98fd-8dd0005ecc65', // 12 - hernan.hernandez
    '315db191-3aa2-4b8e-9cde-3a5b0a4732dc', // 13 - hernan.rocco
    '89003fd0-2a0c-4b61-87dd-cb8b5577783f', // 14 - ivan.sepulveda
    'd33e50a5-1080-41f9-b5b2-588efaaf478e', // 15 - jose.derodt
    '2bd660e8-ce06-424f-bff6-b466a24a00fa', // 16 - marcelo.jadue
    '789b0976-51ae-4caf-860b-8d3dcb47900f', // 17 - mauricio.cerda
    'aff008c3-7b58-4086-843a-63877399385b', // 18 - moises.caceres
    'ff2420ec-0c8f-4834-bfc8-add32ecdf3b9', // 19 - pablo.arnoff
    '25d56d89-eb2f-4372-ab47-238feb152b91', // 20 - patricio.bravo
    '92b18b8a-59a5-49cc-91e1-a0ebd955b60e', // 21 - ricardo.hierro
    '0b7d399c-d605-4bc0-b5a7-6ef5224c1c9d', // 22 - rodrigo.estay
    '10f0975d-68bd-4d54-848a-fd3a3c95879c', // 23 - rodrigo.valdivieso
    'c99f111b-85c9-4dee-8ab5-23b439b5ced0', // 24 - francisco.labrin
    'b84276b8-b2c3-4b82-bf2d-2236a17d0f51', // 25 - pilar.oteiza

    // Empresa de Prueba
    '92d4b625-cbb8-4996-92cf-e1f68612006e', // 26 - admin
  ],
  projects: [
    // Manquehue
    '92d4b625-cbb8-4996-92cf-e1f68612006e', // 0 - Maderos 5 - Auditoría Urba
    '7641a059-0dcc-4b3a-9c4a-9f76d7f26b05', // 1 - Edificios de Hacienda 1 - Auditoría Urba
    '21b4dd4c-6b16-48af-a523-7da94729d1e1', // 2 - Edificios de Hacienda 2 - Auditoría Urba
    '16b2efd8-838a-468f-9640-89c628b7c8ca', // 3 - Montepiedra 5 - Auditoría Urba
    'c3cb52cb-3246-4134-b35d-4290decfca9d', // 4 - Vista Los Bosques 3 - Auditoría Urba
    'dffa881e-9fa6-4087-ac68-aa1a64165254', // 5 - Aguas Claras 1 - Auditoría Urba
    'd1c597fb-a9eb-439e-b35f-68ee4011b71c', // 6 - Aguas Claras 2 - Auditoría Urba
    '270459de-6ca3-4169-b0ea-f74dd903c91b', // 7 - San Anselmo - Auditoría Urba
    'd792edfd-8d5b-4384-b347-edd59b595e92', // 8 - Av Rabat - Auditoría Urba
    '10f04b6c-d9cb-4ae4-aad7-fcba64e45e14', // 9 - Estancia Liray 2.4 - Auditoría Urba
    'e800b6b1-7441-4dd6-bf65-08486e10e5f0', // 10 - Estancia Liray 7 - Auditoría Urba
    '58a63508-25fb-48c3-a0ac-94e3667e521b', // 11 - Estancia Liray 8.2 - Auditoría Urba
    '18357a78-1f5d-43c2-b497-89181157bbab', // 12 - Estancia Liray Ensanche San Martín - Auditoría Urba
    'ab3e0c00-1224-43e9-9576-90b79fb39a5a', // 13 - Maderos 5 - Urba
    'faefd5f5-0807-4066-bd2c-7a57c9f3929f', // 14 - Edificios de Hacienda 1 - Urba
    '34e2febc-d392-405f-b9af-4d081e9149f1', // 15 - Edificios de Hacienda 2 - Urba
    '11c9462a-7947-4aee-822f-426a1a7b9314', // 16 - Montepiedra 5 - Urba
    '6c89501d-cd9c-4018-85ea-a00319c89fec', // 17 - Vista Los Bosques 3 - Urba
    '15f5a22d-91f2-430a-90e1-2607dde5da77', // 18 - Aguas Claras 1 - Urba
    'a6589409-4d72-44d5-a067-b7246b4eeff1', // 19 - Aguas Claras 2 - Urba
    'd82c7c1b-fad4-41c5-881e-917f8fbdaaae', // 20 - San Anselmo - Urba
    '19bd5d9a-2615-4e5f-b01d-eacf8655ac94', // 21 - Av Rabat - Urba
    '3ccb32f4-6ad1-471f-b7ac-b89dc31c51fa', // 22 - Estancia Liray 2.4 - Urba
    'c5377c7c-4e46-4d30-82d3-54e346365118', // 23 - Estancia Liray 7 - Urba
    '38867742-459e-4551-939d-92af2f7589ac', // 24 - Estancia Liray 8.2 - Urba
    '71265c38-78b1-485a-8122-1737f0617b80', // 25 - Estancia Liray Ensanche San Martín - Urba
    'd8a82109-3ec2-4e2e-be75-eb2879d4fe00', // 26 - Campo Machalí 1 - Auditoría Ed
    'bc22598a-d15d-49b4-8c16-7166a000e576', // 27 - Haras 5 - Auditoría Ed
    '5c9bea4c-71ad-4ce0-80eb-7a20e01a4a46', // 28 - Campo Machalí 2 - Auditoría Ed
    '7e97c39d-4994-4ea5-aea7-080e0238a608', // 29 - Rio Claro 1 - Auditoría Ed
    '5fcd41dd-ec1f-43f8-91a3-5d9fb887892d', // 30 - Rio Malleco 1 - Auditoría Ed
    'af1b6d3d-2398-4b85-9caf-81453df03fa3', // 31 - Estancia 4.4 - Auditoría Ed
    '8e64ce76-d8ee-43cf-86dd-17e87346c93d', // 32 - Estancia 8.2 - Auditoría Ed
    '0f51ac86-c3e0-4a0f-ad49-e121d957edee', // 33 - Cumbres Torre D - Auditoría Ed
    '36344f1d-bd11-4305-8291-d50b31cca3bc', // 34 - Cumbres Torre E - Auditoría Ed
    '78245c5f-f372-4761-921e-8439d680ff18', // 35 - Agustín del Castillo - Auditoría Ed
    '97d39e37-2e1e-45a8-9662-c06cd79a7bfc', // 36 - Montepiedra 3 - Auditoría Ed
    'b2be0e7d-2325-4bd1-9419-5c6f2e32349e', // 37 - Maderos 3 - Auditoría Ed
    '4f54eeb9-624f-4732-b97f-c7e2be950483', // 38 - Vista Los Bosques 2 - Auditoría Ed
    '7b850a9d-4055-4b5a-bddc-8c3c850ff74f', // 39 - Montepiedra 2 - Auditoría Ed
    '52535f55-ce6e-42a2-9efb-78ce8246370d', // 40 - Montepiedra 4 - Auditoría Ed
    '121126e9-ca2e-44f5-afb9-c1ad1b0c8755', // 41 - Aguas Claras 1 - Auditoría Ed
    '3824e822-b42b-43ed-b7c1-e00201f3e1cc', // 42 - Aguas Claras 2 - Auditoría Ed
    'e85e44da-7c41-4941-9d2e-3f42347c8cbe', // 43 - Agua Piedra - Auditoría Ed
    '30cff3f8-9872-4eb8-baef-c3d70550408a', // 44 - Los Robles - Auditoría Ed
    '2e59f6ee-69a7-4fd9-997c-5a35940b081d', // 45 - Casas de Hacienda - Auditoría Ed
    '2e33ed95-a824-4116-bc87-973b07fb94fb', // 46 - Campo Machalí 1 - Ed
    '26bd87c1-3487-4806-822c-a49a83f9a59a', // 47 - Haras 5 - Ed
    '887a608a-7826-4b45-9c29-3d08757f792d', // 48 - Campo Machalí 2 - Ed
    '539093dc-10df-4458-ab37-670868c605a7', // 49 - Rio Claro 1 - Ed
    'aa7463db-49ee-4e1a-a109-b195111ac405', // 50 - Rio Malleco 1 - Ed
    'db9e5aab-2394-4326-8296-52cc054f3754', // 51 - Estancia 4.4 - Ed
    'b05dcf19-7ffb-454d-a0e2-177e2a6c029a', // 52 - Estancia 8.2 - Ed
    '305fe7c0-1e5f-4eb9-b458-23a5726d5519', // 53 - Cumbres Torre D - Ed
    '04723f4f-f4bd-45d2-82a1-3c77f845142b', // 54 - Cumbres Torre E - Ed
    '0e64eb83-ae26-4f99-9668-83395ad78f52', // 55 - Agustín del Castillo - Ed
    'e3f16f89-e728-4f57-977a-51d7072f40e2', // 56 - Montepiedra 3 - Ed
    '2dcfc869-8efc-4aea-9a71-03806a367067', // 57 - Maderos 3 - Ed
    'd547fa77-943a-45d6-a62a-dd4e8dd070c7', // 58 - Vista Los Bosques 2 - Ed
    'd33e6e35-dfd3-4d43-b277-fefc3bac7d03', // 59 - Montepiedra 2 - Ed
    '6e38f2d7-e43b-4ea5-914c-92b36e9d4df0', // 60 - Montepiedra 4 - Ed
    '8bb10c74-177c-4b4e-80b7-41464e11efdc', // 61 - Aguas Claras 1 - Ed
    '9f1dddf7-5da5-44db-87fb-16131e2cef75', // 62 - Aguas Claras 2 - Ed
    '0a5b78bf-2b86-4b53-ad33-c97580f697ba', // 63 - Agua Piedra - Ed
    '432c6c1b-cea0-4481-8c87-f1626891cb85', // 64 - Los Robles - Ed
    '8c3bbc8d-1a8c-4a9f-8d33-48a6e62dcb3f', // 65 - Casas de Hacienda - Ed
    'e1caf6a9-621a-41a0-bff7-27903a3c461f', // 66 - Bodega Post-Venta - Auditoría Bodega
    '625d0de2-ddeb-4e4f-be84-beb17be8a86a', // 67 - Bodega Urbanización - Auditoría Bodega
    'dc816a34-ab5d-4637-bd64-52c7be557a0f', // 68 - Bodega Casas de Hacienda - Auditoría Bodega
    'e27ebc0d-8764-445b-a18e-70f46d1397d2', // 69 - Bodega Maderos 3 - Ed - Auditoría Bodega
    '1f43d945-794c-4877-952c-d15646f9388a', // 70 - Bodega Maderos 6 - Urba - Auditoría Bodega
    '9c2009e4-6606-4057-b2f7-981bbb778080', // 71 - Bodega Agustin del Castillo - Auditoría Bodega
    '09f75dd9-1e48-496e-bffb-5b45f5e27cfd', // 72 - Bodega Central - Auditoría Bodega
    '2756551d-a266-4be1-a184-6110e0925c13', // 73 - Cumbres Torre D - Auditoría Bodega
    '7894e6ec-f37c-4c58-b54d-b9ed79871a50', // 74 - Cumbres Torre E - Auditoría Bodega
    'c963915f-feba-4a15-829b-2a780428d0f1', // 75 - Estancia Liray 2.4 - Auditoría Bodega
    'fbe9c4c8-3151-44b5-ab1d-f7060e8dedd6', // 76 - Estancia Liray 7 - Auditoría Bodega
    '5889f32a-87ca-4741-ae23-1a8406fa5778', // 77 - Estancia Liray 8.2 - Auditoría Bodega
    '2b26f1cd-4499-4f25-8d4d-83dee2ffb330', // 78 - Estancia Liray Ensanche San Martín - Auditoría Bodega
    'e2af4015-0ad9-4ce9-991e-2166f9e690fc', // 79 - Edificios de Hacienda 1 - Auditoría Bodega
    'cc1ccb54-b500-41b1-b59d-f7c66ba340d4', // 80 - Edificios de Hacienda 2 - Auditoría Bodega
    'de38b1d4-d541-4a35-9e54-b07ca8dbf674', // 81 - Aguas Claras 1 - Auditoría Bodega
    '5123a7ac-6c5b-4754-9a6b-1d0db7ec65b1', // 82 - Aguas Claras 2 - Auditoría Bodega
    'd8b3b775-ddca-4e4a-a59b-8dcc25dca995', // 83 - Vista Los Bosques 2 - Auditoría Bodega
    'a81184c4-f4d2-423c-93ef-78850258ecb0', // 84 - Vista Los Bosques 3 - Auditoría Bodega
    '31e49e5b-68e7-4258-8235-c5dec3bb4d84', // 85 - Campo Machalí 1 - Auditoría Bodega
    '19546c43-c3ac-4a8f-a043-6fee6438738f', // 86 - Campo Machalí 2 - Auditoría Bodega
    '450030df-a112-4cdd-b61f-948c5b2967d2', // 87 - Rio Claro 1 - Auditoría Bodega
    'f2fc84f7-0758-4bf2-af53-3c2abaae2c6a', // 88 - Rio Malleco 1 - Auditoría Bodega
    '5bbb294c-0cfc-4878-ae35-8b4540c3f45f', // 89 - Haras 5 - Auditoría Bodega
    'a58fd68b-07a8-4d3f-9652-582be0bd1292', // 90 - Bodega Post-Venta - Bodega
    'e28db933-a7d0-4b89-9695-62dee0dc0101', // 91 - Bodega Urbanización - Bodega
    '8b13e35e-05b2-42ee-b487-7a1c5adce7ca', // 92 - Bodega Casas de Hacienda - Bodega
    'd0fb11a0-cbd8-4b9c-9383-1aff9b0f397d', // 93 - Bodega Maderos 3 - Ed - Bodega
    '790b6033-773f-4217-ba16-a84adcd37b17', // 94 - Bodega Maderos 6 - Urba - Bodega
    '6390c886-b834-49eb-a03e-b47e146c26c2', // 95 - Bodega Agustin del Castillo - Bodega
    '88d97201-6075-47b6-8f76-e5e16e9a6baf', // 96 - Bodega Central - Bodega
    '4ab103cb-fe5d-4d64-87fd-a85bb84c7357', // 97 - Cumbres Torre D - Bodega
    '499826bc-41ad-4002-8069-552fd6213632', // 98 - Cumbres Torre E - Bodega
    '797abfdb-76be-40a8-ac15-47c943177f25', // 99 - Estancia Liray 2.4 - Bodega
    '78c4bd19-3aee-4f8d-8cd7-8f24f9a8bfee', // 100 - Estancia Liray 7 - Bodega
    'e5689466-54ae-4427-ba77-c6b0ea5431a4', // 101 - Estancia Liray 8.2 - Bodega
    'f3655159-055f-4504-a5e4-c6d863fce6bb', // 102 - Estancia Liray Ensanche San Martín - Bodega
    '7337baf5-9e80-42a0-a88e-0e08779c4b1d', // 103 - Edificios de Hacienda 1 - Bodega
    'b4e2ee8b-5d00-452b-9992-8de954be2a09', // 104 - Edificios de Hacienda 2 - Bodega
    '3e562aea-3527-4769-8383-144efe6d961a', // 105 - Aguas Claras 1 - Bodega
    'f5e087d0-d7ab-4fc0-adc2-9ab0f4424d4a', // 106 - Aguas Claras 2 - Bodega
    '5c3f5cab-09a0-442e-ac54-c9f2f16b5e54', // 107 - Vista Los Bosques 2 - Bodega
    'e22b7926-5723-409f-8982-b051f2d804fb', // 108 - Vista Los Bosques 3 - Bodega
    'ad6140e2-6556-4733-bc85-036f68a9fedb', // 109 - Campo Machalí 1 - Bodega
    '83e5e605-4e57-407d-853c-f614539b44c6', // 110 - Campo Machalí 2 - Bodega
    'f8ebfd03-f698-4d6f-b4bd-5d82e5c04985', // 111 - Rio Claro 1 - Bodega
    '02d1729f-da3b-4c17-9162-a1e6a9b89ec4', // 112 - Rio Malleco 1 - Bodega
    'cfc173b5-f28f-44c2-8009-f6dd78e8fd1b', // 113 - Haras 5 - Bodega

    // Empresa de Prueba
    '3d29c5e0-ae0c-460c-99cc-54ae55b5ef4a', // 114 - Proyecto de Prueba - Etapa 01
    '8b36cba3-8289-4340-8a2e-a3133acfd30b', // 115 - Proyecto de Prueba - Etapa 01
    '080d40d0-0b02-4aa3-8d1a-8a59211e0dac', // 116 - Proyecto de Prueba - Etapa 01
    '9025999c-40bd-48a1-9cdb-7dd7710127e4', // 117 - Proyecto de Prueba - Etapa 01
    '977dfc7b-25ac-4a41-89ed-e2a5a269c94c', // 118 - Proyecto de Prueba - Etapa 01
    '543783ce-bfe7-40ce-9441-caa99441e780', // 119 - Proyecto de Prueba - Etapa 01
    'fae56b4a-210e-4ec0-a484-98f97448a3bf', // 120 - Proyecto de Prueba - Etapa 01
    '206d89e6-06c4-4993-85c6-a49ae7372a2e', // 121 - Proyecto de Prueba - Etapa 01
    '0c70c9fd-2a42-426c-b309-3028bc33f5f6', // 122 - Proyecto de Prueba - Etapa 01
    'd6e57482-1450-4106-b358-f52475d76e1f', // 123 - Proyecto de Prueba - Etapa 01
    '2825d35b-3a60-443e-a258-deaa836ec3d1', // 124 - Proyecto de Prueba - Etapa 01
    'e371f879-eb2f-44e9-8660-3b2b4006b448', // 125 - Proyecto de Prueba - Etapa 01
    '4128697b-3f5d-4ee2-86ed-2abf464add9b', // 126 - Proyecto de Prueba - Etapa 01
    '4ee4d77b-ab1e-464f-974d-348c6c84ec66', // 127 - Proyecto de Prueba - Etapa 01
    '3abb99b5-5e0d-4a28-b674-5da068fe073c', // 128 - Proyecto de Prueba - Etapa 01
    'd2d57784-bfdd-4475-8a5c-6868c4c7a01e', // 129 - Proyecto de Prueba - Etapa 01
  ],
};
