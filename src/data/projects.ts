export type ProjectData = {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  category: string;
  visible: boolean;
  images: string[];
  video?: string[]; // URL del video de la proyecto
};

export const projectsData: ProjectData[] = [
  {
    id: "1",
    title: "Pintura Exterior en McDonald's (Sur, Alborada, y otros locales)",
    location: "Sur y Alborada Locales de McDonald's",
    date: "30 de noviembre 2026",
    description: "Trabajo completo de pintura exterior en locales de McDonald's ubicados en el sur y la Alborada. Incluyó preparación de superficie y aplicación de pintura acorde a los estándares de la marca.",
    category: "Pintura Comercial",
    visible: true,
    images: [
      "/mc-1.png",
      "/mc-2.png",
      "/mc-3.png",
      "/mc 4.jpg",
      "/mc 5.jpg",
      "/mc 6.jpg",
      "/mc 7.jpg",
      "/mc 8.jpg",
      "/mc 9.jpg",
      "/mc 10.jpg",
    ],
  video: [ 
      "/mc v1.mp4",
      "/mc v2.mp4"
    ]
  },
  {
    id: "2",
    title: "Pintura Exterior en Condominio",
    location: "Jose de Antepara entre Luque y Velez",
    date: "21 de abril, 2026",
    description: "Los trabajos comprenden el rasqueteo de pintura deteriorada, reparación de fisuras, sellado de superficies y aplicación de pintura en la fachada principal, parte posterior, laterales, terraza, tumbados y columnas. Además, se efectuará la pintura de las rejas de las ventanas, la reja del aire acondicionado, la reja del balcón y el tubo ubicado junto al aire acondicionado de la entrada, garantizando un acabado uniforme, resistente y de alta calidad.",
    category: "Pintura de Edificios",
    visible: true,
    images: [
      "/uploads/ejemplo2-a.jpg",
      "/uploads/ejemplo2-b.jpg",
      "/uploads/ejemplo2-c.jpg"
    ]
  },
  {
    id: "3",
    title: "Pintura Exterior e Interior de Casa",
    location: "Urb. Aurora",
    date: "15 de Septiembre, 2024",
    description: "Servicio completo de pintura exterior e interior en vivienda residencial, incluyendo preparación de superficies y acabados de calidad.",
    category: "Pintura Residencial",
    visible: true,
    images: [
      "/ejemplo3-a.jpg",
      "/uploads/ejemplo3-b.jpg",
      "/uploads/ejemplo3-c.jpg"
    ]
  },
    {
    id: "4",
    title: "Pintura Exterior en Condominio",
    location: "Antepara y Pedro Pablo Gomez",
    date: "25 de Marzo, 2026",
    description: "Mantenimiento integral de la fachada del edificio, que incluye rasqueteo de pintura deteriorada, reparación y sellado de fisuras, preparación de superficies y aplicación de pintura en fachadas, columnas, losas, balcones y rejas, garantizando un acabado uniforme, estético y de larga duración.",
    category: "Pintura de Edificios",
    visible: true,
    images: [
      "/uploads/ejemplo2-a.jpg",
      "/uploads/ejemplo2-b.jpg",
      "/uploads/ejemplo2-c.jpg"
    ]
  },
    {
    id: "5",
    title: "Pintura interior en departamento",
    location: "Jose de Antepara entre Luque y Velez",
    date: "04 de Mayo, 2026",
    description: "Mantenimiento de pintura del departamento, que incluye preparación de superficies, rasqueteo, reparación de fisuras, empastado, lijado, sellado y aplicación de pintura para lograr un acabado uniforme y duradero.",
    category: "Pintura Residencial",
    visible: true,
    images: [
      "/uploads/ejemplo3-a.jpg",
      "/uploads/ejemplo3-b.jpg",
      "/uploads/ejemplo3-c.jpg"
    ]
  },
      {
    id: "6",
    title: "Pintura interior en bodega",
    location: "Jose de Antepara entre Luque y Velez",
    date: "27 de Abril, 2026",
    description: "Mantenimiento de pintura del departamento, que incluye preparación de superficies, rasqueteo, reparación de fisuras, empastado, lijado, sellado y aplicación de pintura para lograr un acabado uniforme y duradero.",
    category: "Pintura Residencial",
    visible: true,
    images: [
      "/uploads/ejemplo3-a.jpg",
      "/uploads/ejemplo3-b.jpg",
      "/uploads/ejemplo3-c.jpg"
    ]
  },
      {
    id: "7",
    title: "Pintura en edificio",
    location: "Villamil Playa",
    date: "10 de enero, 2015",
    description: "Se realizó el sellado de superficies y la aplicación de pintura en la fachada del edificio, garantizando una adecuada protección contra la humedad y los agentes climáticos. El trabajo incluyó la preparación de las superficies, aplicación de sellador y acabado con pintura de alta calidad para lograr una terminación uniforme, resistente y de excelente presentación.",
    category: "Pintura de Edificios",
    visible: true,
    images: [
      "/salinas1.jpg",
      "/salinas 2.jpeg",
      "/salinas 3.jpeg",
      "/salinas 4.jpeg",
      "/salinas 5.jpeg",
      "/salinas 6.jpeg"
    ]
  },
   {
    id: "8",
    title: "Pintura en Shopping Duran",
    location: "El paseo Shopping Duran",
    date: "15 de mayo, 2015",
    description: "Se realizó el sellado de superficies y la aplicación de pintura en la fachada del edificio, garantizando una adecuada protección contra la humedad y los agentes climáticos. El trabajo incluyó la preparación de las superficies, aplicación de sellador y acabado con pintura de alta calidad para lograr una terminación uniforme, resistente y de excelente presentación.",
    category: "Pintura de Edificios",
    visible: true,
    images: [
      "/duran 1.png",
      "/duran 2.png",
      "/duran 3.png",
      "/duran 4.png"
    ]
  },
  {
    id: "8",
    title: "Pintura en ciudadela Rinconada del lago",
    location: "Samborondon",
    date: "10 de septiembre, 2024",
    description: "El trabajo realizado en la propiedad consistió en el sellado y reparación de fisuras, seguido de la aplicación de Plasmont y un corrector de enlucido para nivelar y alisar las superficies antes del pintado general de las fachadas, complementado con una limpieza profunda y el pintado final de todas las rejas y elementos metálicos para asegurar su protección y renovar su estética.",
    category: "Pintura Residencial",
    visible: true,
    images: [
      "/rinconada 1.png",
      "/rinconada 2.png",
      "/rinconada 3.png",
      "/rinconada 4.jpg",
      "/rinconada 5.jpg"
    ]
  },
  {
    id: "9",
    title: "Pintura en el Edificio Administrativo de Colgate Palmolive ",
    location: "Km 16.5, Vía a Daule, Daule",
    date: "01 de julio, 2024",
    description: "Se realizó el mantenimiento de pintura en el edificio administrativo de la fábrica Colgate Palmolive. El trabajo consistió en la limpieza del edificio mediante hidrolavado, seguida de una mano de sellador. Posteriormente, se repararon las fisuras existentes y se aplicó corrector de enlucido para nivelar la superficie. Finalmente, se realizaron dos manos de pintura exterior. Este proceso se llevó a cabo con el objetivo de prevenir la humedad y proteger el recubrimiento, evitando que la pintura se deteriore con facilidad.",
    category: "Pintura de Edificios",
    visible: true,
    images: [ 
      "/colgate 1.png",
      "/colgate 2.png",
      "/colgate 3.png",
      "/colgate 4.png",
      "/colgate 5.png",
      "/colgate 6.png",
      "/colgate 7.png"
    ],
    video: [ 
      "/colgate v1.mp4"
    ]
  },
  {
    id: "10",
    title: "Pintura la cafeteria de Colgate Palmolive ",
    location: "Km 16.5, Vía a Daule, Daule",
    date: "01 de julio, 2024",
    description: "Se realizó el mantenimiento de pintura en cafeteria de la fábrica Colgate Palmolive. El trabajo consistió en la limpieza del edificio mediante hidrolavado, seguida de una mano de sellador. Posteriormente, se repararon las fisuras existentes y se aplicó corrector de enlucido para nivelar la superficie. Finalmente, se realizaron dos manos de pintura exterior. Este proceso se llevó a cabo con el objetivo de prevenir la humedad y proteger el recubrimiento, evitando que la pintura se deteriore con facilidad.",
    category: "Pintura de Edificios",
    visible: true,
    images: [ 
      "/Cafeteria 1.png",
      "/Cafeteria 2.png",
      "/Cafeteria 3.png",
      "/Cafeteria 4.jpeg",
      "/cafeteria 5.jpeg"
    ]
  },
   {
    id: "11",
    title: "Pintura en los condominios de las acacias ",
    location: "sur de Guayaquil, frente al parque del sector TikTok y cerca de la Av. 25 de Julio y el Mall del Sur",
    date: "15 de mayo, 2017",
    description: "Se realizó el mantenimiento de pintura en condominios Las Acacias. El trabajo consistió en la limpieza del edificio mediante hidrolavado, seguida de una mano de sellador. Posteriormente, se repararon las fisuras existentes y se aplicó corrector de enlucido para nivelar la superficie. Finalmente, se realizaron dos manos de pintura exterior. Este proceso se llevó a cabo con el objetivo de prevenir la humedad y proteger el recubrimiento, evitando que la pintura se deteriore con facilidad.",
    category: "Pintura de Edificios",
    visible: true,
    images: [ 
      "/acacias 1.png",
      "/acacias 2.png",
      "/acacias 3.png",
      "/acacias 4.jpg",
      "/acacias 5.jpg",
      "/acacias 6.jpg",
      "/acacias 7.jpg",
      "/acacias 8.jpg",
      "/acacias 9.jpg",
      "/acacias 10.jpg",
      "/acacias 11.jpg"
    ]
  },
  {
    id: "12",
    title: "Pintura en el Mall del fortin ",
    location: "Km. 25 de la Av. Perimetral, entre la Av. Modesto Luque y la Calle Casuarina",
    date: "01 de marzo, 2024",
    description: "Se realizó el mantenimiento de pintura en el Mall El Fortín, donde se pintó un lateral del edificio. El trabajo consistió en la limpieza de la superficie mediante hidrolavado, seguida de una mano de sellador y la reparación de fisuras existentes. Finalmente, se realizaron dos manos de pintura exterior. Este proceso se llevó a cabo con el objetivo de prevenir la humedad y proteger el recubrimiento, evitando que la pintura se deteriore con facilidad..",
    category: "Pintura de Edificios",
    visible: true,
    images: [ 
      "/fortin 1.png",
      "/fortin 2.png",
      "/fortin 3.png",
      "/fortin 4.jpg",
      "/fortin 5.jpg"
    ],
    video: [ 
      "/fortin v1.mp4",
      "/fortin v2.mp4",
      "/fortin v3.mp4"
    ]
  },
  {
    id: "13",
    title: "Pintura en el cuartel modelo ",
    location: "AV. Las America",
    date: "15 de agosto, 2016",
    description: "Se realizó el trabajo de pintura exterior en el cuartel modelo . El personal, equipado con arnés, casco y todo el equipo de seguridad industrial requerido, trabajó de forma simultánea en distintos puntos de la fachada para optimizar los tiempos de ejecución. El proceso incluyó la aplicación de pintura exterior de alta resistencia sobre toda la superficie, cubriendo tanto las caras principales como los laterales del edificio, garantizando un acabado uniforme y de calidad en altura. Todo el trabajo se ejecutó bajo estrictas normas de seguridad industrial, minimizando riesgos tanto para el personal como para el entorno.",
    category: "Pintura de Edificios",
    visible: true,
    images: [ 
      "/av 1.jpg",
      "/av 2.jpg",
      "/av 3.jpg",
      "/av 4.jpg",
      "/av 5.jpg"
    ]
  },
  {
    id: "14",
    title: "Pintura en el tanque industrial Mall del Fortin  ",
    location: "Km. 25 de la Av. Perimetral, entre la Av. Modesto Luque y la Calle Casuarina",
    date: "15 de diciembre, 2024",
    description:  "Se realizó el trabajo de pintura en el tanque industrial ubicado en las instalaciones del Mall El Fortín, bajo la estructura representativa del colibrí. El trabajo se ejecutó mediante técnica de rappel con cuerdas certificadas, dada la altura y la forma cilíndrica de la estructura. El proceso incluyó la preparación de la superficie y la aplicación de pintura en franjas por secciones, cubriendo la totalidad del tanque con los colores correspondientes a su diseño. Todo el trabajo se realizó bajo estrictas normas de seguridad industrial, con el personal debidamente equipado con arnés, casco y línea de vida.",
    category: "Pintura de Edificios",
    visible: true,
    images: [ 
      "/cir 1.jpg",
      "/cir 2.jpg",
      "/cir 3.jpg",
      "/cir 4.jpg",
      "/cir 5.jpg"
    ]
  },
  {
    id: "15",
    title: "Pintura en el parqueadero del edificio el fortin  ",
    location: "Padre Juan Bautista Aguirre Carbo 102-114",
    date: "15 de junio, 2025",
    description:  "Se realizó el trabajo de señalización y demarcación en el parqueadero del edificio, el cual consistió en la pintura de franjas de seguridad en amarillo y negro sobre columnas y pilares de la estructura, así como en topes de seguridad para vehículos. Adicionalmente, se realizó la rotulación numerada de los espacios de parqueo asignados, aplicando el diseño correspondiente a cada puesto sobre las paredes. Todo el trabajo se ejecutó con pintura de alta durabilidad, adecuada para tráfico vehicular y uso constante, garantizando visibilidad y señalización clara dentro de las instalaciones." ,
    category: "Pintura de Edificios",
    visible: true,
    images: [ 
      "/par 1.jpg",
      "/par 2.jpg",
      "/par 3.jpg",
      "/par 4.jpg",
      "/par 5.jpg"
    ]
  },
  {
    id: "16",
    title: "Pintura en la ciudadela vista sol  ",
    location: "kilómetro 7.8 de la Avenida Samborondón (Avenida Principal 7850), en el cantón Samborondón, provincia del Guayas, junto a la Iglesia San José.",
    date: "15 de junio, 2025",
    description:  "Se realizó el trabajo de pintura exterior en viviendas residenciales dentro de un conjunto habitacional cerrado. El trabajo incluyó la aplicación de pintura en fachadas de dos niveles, molduras, aleros y cornisas, respetando los diseños arquitectónicos personalizados de cada vivienda, incluyendo combinaciones de color en tonos morado, mostaza y gris. Se trabajó también en áreas de difícil acceso como pasillos laterales estrechos y zonas cercanas a piscina, cuidando el acabado en cada detalle. El proceso incluyó preparación de superficie, protección de áreas circundantes (jardines, mobiliario y acabados existentes) y aplicación de pintura de alta calidad para exteriores, garantizando durabilidad y un acabado uniforme." ,
    category: "Pintura Residencial",
    visible: true,
    images: [ 
      "/punt 1.jpg",
      "/punt 2.jpg",
      "/punt 3.jpg",
      "/punt 4.jpg",
      "/punt 5.jpg",
      "/punt 6.jpg",
      "/punt 7.jpg",
      "/punt 8.jpg"
    ]
  },
  {
    id: "17",
    title: "Pintura en los Condominios de Romadera  ",
    location: "kilómetro 1.6 al 1.8 de la Avenida Narcisa de Jesús.",
    date: "05 de junio, 2023",
    description:  "Se realizó el trabajo de pintura exterior en los edificios del conjunto residencial Romadera, que aún se encontraba en etapa de acabados. Debido a la altura de las torres (5 pisos), el trabajo se ejecutó con técnica de rappel y cuerdas de seguridad. Se pintaron las fachadas siguiendo el diseño de cada bloque, combinando tonos café y beige, con detalles en rojo y naranja en los pasillos y áreas comunes. El equipo trabajó en varios puntos del edificio al mismo tiempo para cumplir con los tiempos de entrega, siempre bajo las medidas de seguridad necesarias para trabajar en altura." ,
    category: "Pintura de Edificios",
    visible: true,
    images: [ 
      "/rom 1.jpg",
      "/rom 2.jpg",
      "/rom 3.jpg",
      "/rom 4.jpg",
    ]
  },
  {
    id: "18",
    title: "Renovación de Fachada en Edificio - Ciudadela Entre Ríos",
    location: "Ciudadela Entre Ríos",
    date: "02 de marzo,2024",
    description: "El trabajo realizado consistió en la renovación completa de la fachada de un edificio multifamiliar de tres pisos, que presentaba pintura deteriorada y agrietada, mediante preparación de superficie, sellado de fisuras y aplicación de pintura exterior.",
    category: "Pintura de Edificios",
    visible: true,
    images: [
      "/rios 1.jpg",
      "/rios 2.jpg",
      "/rios 3.jpg",
      "/rios 4.jpg"
    ]
  },
{
    id: "19",
    title: "Pintura Exterior en Edificios de la regeneracion urbana desde el cerro santa Ana, la gobernación y la zona bancaria ",
    location: "Guayaquil",
    date: "20 de julio, 2019",
    description: "El trabajo realizado consistió en la pintura exterior de varios edificios ubicados en el sector de Guayaquil, mediante técnica de rappel con cuerdas de seguridad. Se trabajó en estructuras de distintas alturas y estilos arquitectónicos, incluyendo edificaciones patrimoniales con detalles ornamentales, cúpulas y molduras, cuidando el acabado en cada zona. El equipo trabajó en varios puntos de cada fachada al mismo tiempo, siempre bajo las medidas de seguridad necesarias para el trabajo en altura.",
    category: "Pintura de Edificios",
    visible: true,
    images: [
      "/urb 1.jpeg",
      "/urb 2.jpeg",
      "/urb 3.jpeg",
      "/urb 4.jpeg",
      "/urb 5.jpeg",
      "/urb 6.jpeg",
      "/urb 7.jpeg",
      "/urb 8.jpeg",
      "/urb 9.jpeg",
      "/urb 10.jpeg",
      "/urb 11.jpeg",
      "/urb 12.jpeg",
      "/urb 13.jpeg",
      "/urb 14.jpeg",
      "/urb 15.jpeg",
      "/urb 16.jpeg",
      "/urb 17.jpeg",
      "/urb 18.jpeg",
      "/urb 19.jpeg",
      "/urb 20.jpeg",
      "/urb 21.jpeg",
      "/urb 22.jpeg",
      "/urb 23.jpeg",
      "/urb 24.jpeg",
      "/urb 25.jpeg",
      "/urb 26.jpeg",
      "/urb 27.jpeg",
      "/urb 28.jpeg",
      "/urb 29.jpeg",
      "/urb 30.jpeg",
      "/urb 31.jpeg",
      "/urb 32.jpeg",
      "/urb 33.jpeg",
      "/urb 34.jpeg",
      "/urb 35.jpeg",
      "/urb 36.jpeg",
      "/urb 37.jpeg",
      "/urb 38.jpeg",
      "/urb 39.jpeg",
      "/urb 40.jpeg",
      "/urb 41.jpeg",
    ]
  },
  {
    id: "20",
    title: "Pintura Exterior de Vivienda en La Alborada",
    location: "Guayaquil",
    date: "20 de febrero, 2018",
    description: "El trabajo realizado consistió en la pintura exterior de una vivienda de dos plantas ubicada en el sector de La Alborada, Guayaquil. Se aplicó un cambio de color completo de la fachada (de tonos grises a un amarillo mostaza con detalles cafés en las columnas y molduras), incluyendo el sellado y preparación previa de la superficie de hormigón, protección de ventanas y elementos metálicos, y acabado final en marquesinas, cornisas y detalles decorativos.",
    category: "Pintura Residencial",
    visible: true,
    images: [
      "/alb 1.jpeg",
      "/alb 2.jpeg",
      "/alb 3.jpeg",
      "/alb 4.jpeg"
    ]
    },
    {
    id: "21",
    title: "Pintura interior en el Edificio Equilibrium",
    location: "intersección de la Avenida Juan Tanca Marengo y la Avenida Joaquín Orrantia",
    date: "20 de febrero, 2018",
    description: "El trabajo realizado en el Edificio Equilibrium consistió en labores de mantenimiento y acceso en altura dentro de su atrio principal, utilizando una alta estructura de andamios modulares metálicos para permitir que los operarios alcanzaran la zona de los ventanales superiores y el techo. Esta intervención requirió una cuidadosa coordinación logística y de personal, con trabajadores posicionados tanto en la plataforma elevada como en las diferentes plantas y barandillas del edificio, facilitando así las tareas técnicas en este espacio de gran altura.",
    category: "Pintura de Edificios",
    visible: true,
    images: [
      "/equi 1.jpeg",
      "/equi 2.jpeg"
    ]
    },
    {
    id: "22",
    title: "Pintura exterior en el edificio de Ceibos",
    location: "AV 47 NO CEIBOS",
    date: "20 de febrero, 2022",
    description: "El trabajo realizado consistió en el mantenimiento y renovación integral de la pintura de la fachada exterior del edificio ubicado en el sector de Ceibos. Como se evidencia en la secuencia de imágenes, la intervención se ejecutó mediante técnicas de trabajo en altura con descenso vertical (rapel), utilizando sistemas de seguridad conformados por arneses y cuerdas ancladas desde la azotea. Dos operarios realizaron las labores de mantenimiento, avanzando progresivamente desde los niveles superiores hasta los balcones y la planta baja. Los trabajos incluyeron la renovación del revestimiento de las paredes de color blanco y el tratamiento de la columna decorativa con acabado tipo piedra, logrando una restauración completa, uniforme y estéticamente renovada de las áreas visibles de la fachada del edificio.",
    category: "Pintura de Edificios",
    visible: true,
    images: [
      "/cei 1.jpeg",
      "/cei 2.jpeg",
      "/cei 3.jpeg",
      "/cei 4.jpeg",
      "/cei 5.jpeg",
      "/cei 6.jpeg",
      "/cei 7.jpeg",
      "/cei 8.jpeg",
      "/cei 9.jpeg"
    ]
    },
    {
    id: "23",
    title: "Pintura exterior en el Condominio Genesis",
    location: "calle Cacique Álvarez 528 y Huancavilca",
    date: "20 de febrero, 2022",
    description: "Se realizó el mantenimiento de la pintura de la fachada del Hotel Genesis, un edificio esquinero de cuatro plantas. El trabajo consistió en la renovación cromática de las franjas horizontales. Originalmente, las franjas alternaban entre un tono rojo oscuro y amarillo crema, con secciones en la planta baja de color blanco y beige. Tras la intervención, se mantuvo el color amarillo crema, pero las franjas rojas fueron reemplazadas por un tono rosado vibrante, logrando un aspecto más moderno y llamativo para el hotel. La aplicación se realizó de manera uniforme sobre la estructura existente, conservando la distribución de las ventanas y los equipos de aire acondicionado.",
    category: "Pintura de Edificios",
    visible: true,
    images: [
      "/ge 1.jpeg",
      "/ge 2.jpeg",
      "/ge 3.jpeg",
      "/ge 4.jpeg",
      "/ge 5.jpeg"
    ]
    },
    {
    id: "24",
    title: "Pintura exterior en el Condominio",
    location: "calle Dr. Héctor Romero #216 y la Av. Dr. José María García Moreno",
    date: "20 de agosto, 2022",
    description: "Se realizó el mantenimiento de la pintura de la fachada en el condominio, un edificio de varios pisos con grandes ventanales de vidrio oscurecido y estructura blanca. El trabajo consistió en la renovación y aplicación de pintura en las paredes exteriores mediante técnicas de descenso vertical con arneses y cuerdas, utilizando baldes con material mientras los operarios trabajaban suspendidos a lo largo de los niveles superiores e intermedios del inmueble.",
    category: "Pintura de Edificios",
    visible: true,
    images: [
      "/con 1.jpeg",
      "/con 2.jpeg",
      "/con 3.jpeg",
      "/con 4.jpeg",
      "/con 5.jpeg"
    ]
    },
    {
    id: "25",
    title: "Pintura exterior en el Edificio El Astillero",
    location: "Complejo Puerto Santa Ana, junto al río Guayas en la ciudad de Guayaquil.",
    date: "20 de agosto, 2022",
    description: "El trabajo realizado en el Edificio El Astillero consistió en labores de mantenimiento y renovación de la pintura de la fachada exterior, ejecutadas mediante técnicas de trabajo vertical y descenso controlado por cuerdas (rapel). Los operarios, debidamente equipados con arneses y sistemas de seguridad, realizaron trabajos en diferentes alturas y zonas de difícil acceso, interviniendo columnas, paredes, molduras, cornisas y demás elementos arquitectónicos exteriores, incluyendo las áreas cercanas a los grandes ventanales de vidrio. Las labores se desarrollaron progresivamente desde los niveles superiores hasta las áreas inferiores del edificio, protegiendo previamente las zonas de la planta baja mediante lonas y materiales de cobertura para evitar manchas o daños durante la ejecución, logrando como resultado la renovación y uniformidad del acabado exterior, contribuyendo a la conservación y mejora estética de la fachada del edificio.",
    category: "Pintura de Edificios",
    visible: true,
    images: [
      "/ast 1.jpeg",
      "/ast 2.jpeg",
      "/ast 3.jpeg",
      "/ast 4.jpeg",
      "/ast 5.jpeg"
    ]
    },
    {
    id: "26",
    title: "Pintura exterior en el Edificio Nobis",
    location: "Avenida Joaquín Orrantia y la Avenida Juan Tanca Marengo.",
    date: "25 de noviembre, 2022",
    description: " Se realizó el mantenimiento de la pintura de la fachada en el Edificio Nobis, una moderna torre de varios pisos con una estructura curva de franjas horizontales alternadas entre grandes ventanales de vidrio azul y paneles revestidos. El trabajo consistió en la renovación del recubrimiento exterior mediante la aplicación de pintura de tonos claros, ejecutada en los niveles superiores y verticales del edificio para conservar su aspecto impecable y corporativo. ",
    category: "Pintura de Edificios",
    visible: true,
    images: [
      "/nob 1.jpeg",
      "/nob 2.jpeg",
      "/nob 3.jpeg",
      "/nob 4.jpeg",
      "/nob 5.jpeg"
    ]
    },
    {
    id: "27",
    title: "Pintura exterior en Condominio",
    location: "Kenedy Norte.",
    date: "25 de enero, 2023",
    description: " Se realizó el mantenimiento de la pintura de la fachada de este condominio ubicado en Kennedy Norte, un edificio residencial de varias plantas con balcones y una estructura frontal de portones metálicos negros. El trabajo consistió en la renovación del recubrimiento exterior de las paredes y detalles arquitectónicos, aplicando pintura de tonos claros para revitalizar la imagen de la edificación. ",
    category: "Pintura de Edificios",
    visible: true,
    images: [
      "/ken 1.jpeg",
      "/ken 2.jpeg",
      "/ken 3.jpeg",
      "/ken 4.jpeg"
    ]
    },
        {
    id: "27",
    title: "Pintura exterior en Condominio",
    location: "Kenedy Norte.",
    date: "25 de enero, 2023",
    description: " Se realizó el mantenimiento de la pintura de la fachada de este condominio ubicado en Kennedy Norte, un edificio residencial de varias plantas con balcones y una estructura frontal de portones metálicos negros. El trabajo consistió en la renovación del recubrimiento exterior de las paredes y detalles arquitectónicos, aplicando pintura de tonos claros para revitalizar la imagen de la edificación. ",
    category: "Pintura de Edificios",
    visible: true,
    images: [
      "/ken 1.jpeg",
      "/ken 2.jpeg",
      "/ken 3.jpeg",
      "/ken 4.jpeg"
    ]
    },
];