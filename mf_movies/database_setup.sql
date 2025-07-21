-- Crear tabla de géneros
CREATE TABLE IF NOT EXISTS genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Crear tabla de películas
CREATE TABLE IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_date VARCHAR(100),
    release_year INTEGER,
    duration INTEGER,
    classification VARCHAR(10),
    rating DECIMAL(3,1),
    synopsis TEXT,
    poster_url TEXT,
    hero_poster TEXT,
    trailer_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de relación muchos a muchos entre películas y géneros
CREATE TABLE IF NOT EXISTS movie_genres (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
    genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
    UNIQUE(movie_id, genre_id)
);

-- Insertar géneros
INSERT INTO genres (name) VALUES 
    ('Action'),
    ('Adventure'),
    ('Sci-Fi'),
    ('Drama'),
    ('Comedy'),
    ('Animation'),
    ('Anime'),
    ('Fantasy'),
    ('Family'),
    ('Romance'),
    ('Thriller'),
    ('Crime'),
    ('Mystery'),
    ('Music'),
    ('Romance')
ON CONFLICT (name) DO NOTHING;

-- Insertar películas
INSERT INTO movies (id, title, release_date, release_year, duration, classification, rating, synopsis, poster_url, hero_poster, trailer_url) VALUES
(1, 'Poor Things', 'December 8, 2023', 2012, 141, 'R', 4.5, 'A young woman, Bella Baxter, is resurrected by a brilliant scientist and embarks on an odyssey of self-discovery.', 'https://i.pinimg.com/originals/76/71/5e/76715ecff73dbd26359a6216966eede4.jpg', 'https://images.bauerhosting.com/empire/2023/07/poor-things.jpg?ar=16:9&fit=crop&crop=top&auto=format&w=1440&q=80', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(2, 'Ready Player One', 'March 29, 2018', 2012, 140, 'PG-13', 4.0, 'In the year 2045, the real world is a harsh place. The only time Wade Watts truly feels alive is when he escapes to the OASIS...', 'https://th.bing.com/th/id/R.1717cf334c3df9d3c5ad5d7e5955353f?rik=lEKm4V%2f4cTKFlw&riu=http%3a%2f%2fwww.slashfilm.com%2fwp%2fwp-content%2fimages%2freadyplayerone-teaserposter-full.jpg&ehk=XrWEx2BP3LXqI%2fiVCLPsPfTCru1fRb2G%2bR06fahMfkw%3d&risl=&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/R.1717cf334c3df9d3c5ad5d7e5955353f?rik=lEKm4V%2f4cTKFlw&riu=http%3a%2f%2fwww.slashfilm.com%2fwp%2fwp-content%2fimages%2freadyplayerone-teaserposter-full.jpg&ehk=XrWEx2BP3LXqI%2fiVCLPsPfTCru1fRb2G%2bR06fahMfkw%3d&risl=&pid=ImgRaw&r=0', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(3, 'Baby Driver', 'June 28, 2017', 2012, 113, 'R', 4.3, 'A young getaway driver relies on his passion for music to be the best in the game. When he meets the girl of his dreams...', 'https://th.bing.com/th/id/R.bb2c781b3b67dd18c6a0465c25364127?rik=kfMH%2fNJtuK801w&riu=http%3a%2f%2fcdn.collider.com%2fwp-content%2fuploads%2f2017%2f05%2fbaby-driver-final-poster.jpeg&ehk=h3hnclIw44KJLItVE5ZQpIwh8goW460G51FTku8yK1s%3d&risl=&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/R.bb2c781b3b67dd18c6a0465c25364127?rik=kfMH%2fNJtuK801w&riu=http%3a%2f%2fcdn.collider.com%2fwp-content%2fuploads%2f2017%2f05%2fbaby-driver-final-poster.jpeg&ehk=h3hnclIw44KJLItVE5ZQpIwh8goW460G51FTku8yK1s%3d&risl=&pid=ImgRaw&r=0', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(4, 'Mad Max: Fury Road', 'May 15, 2015', 2012, 120, 'R', 4.6, 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland...', 'https://posterspy.com/wp-content/uploads/2015/03/madmax_2_small.jpg', 'https://posterspy.com/wp-content/uploads/2015/03/madmax_2_small.jpg', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(5, 'Tron', 'July 9, 1982', 2012, 96, 'PG', 3.8, 'A computer hacker is abducted into a digital world and forced to participate in gladiatorial games.', 'https://tse1.mm.bing.net/th/id/OIP.46aplvbkj6wxXVJlV4k4jgHaK-?rs=1&pid=ImgDetMain&o=7&rm=3', 'https://tse1.mm.bing.net/th/id/OIP.46aplvbkj6wxXVJlV4k4jgHaK-?rs=1&pid=ImgDetMain&o=7&rm=3', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(6, 'Mi Vecino Totoro', 'April 16, 1988', 1988, 86, 'G', 4.8, 'Two young girls move to the countryside and encounter a mystical forest spirit named Totoro.', 'https://th.bing.com/th/id/R.548566e8cf45dc11b59d13c12d5dbec0?rik=aeeJkyabBBcO%2fQ&riu=http%3a%2f%2fwww.cartelesmix.com%2fcarteles%2festrenos2009%2fmivecinototoro8803.jpg&ehk=5ZPAAdyJ%2bdhHskc94c2nB596NcISHCCWPnAWMuJZyb4%3d&risl=&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/R.548566e8cf45dc11b59d13c12d5dbec0?rik=aeeJkyabBBcO%2fQ&riu=http%3a%2f%2fwww.cartelesmix.com%2fcarteles%2festrenos2009%2fmivecinototoro8803.jpg&ehk=5ZPAAdyJ%2bdhHskc94c2nB596NcISHCCWPnAWMuJZyb4%3d&risl=&pid=ImgRaw&r=0', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(7, 'Dragon Ball Super: Broly', 'December 14, 2018', 2018, 100, 'PG', 4.4, 'Goku and Vegeta face off against the legendary Saiyan Broly.', 'https://i.pinimg.com/originals/c5/5b/12/c55b124ddca12ac0165f57c90a09acba.jpg', 'https://i.pinimg.com/originals/c5/5b/12/c55b124ddca12ac0165f57c90a09acba.jpg', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(8, 'One Piece Film: Red', 'August 6, 2022', 2022, 115, 'PG-13', 4.3, 'Luffy and his crew attend a concert by Uta, a world-famous singer with a hidden past.', 'https://th.bing.com/th/id/R.3fb65148f9520a8aa183096570328e76?rik=gn42A1VyPhVl2w&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/R.3fb65148f9520a8aa183096570328e76?rik=gn42A1VyPhVl2w&pid=ImgRaw&r=0', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(9, 'Los Ilusionistas', 'May 31, 2013', 2013, 115, 'PG-13', 3.8, 'Un equipo de ilusionistas realiza robos bancarios durante sus espectáculos y los fondos se entregan a la audiencia.', 'https://th.bing.com/th/id/OIP.3n3N603r2lC2wsy5uvt6MAHaLH?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.3n3N603r2lC2wsy5uvt6MAHaLH?rs=1&pid=ImgDetMain', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(10, 'Kingsman: El Círculo Dorado', 'September 20, 2017', 2017, 141, 'R', 3.5, 'Cuando el cuartel general de Kingsman es destruido, los agentes viajan a Estados Unidos para unirse a su organización hermana, Statesman, para detener a un enemigo común.', 'https://th.bing.com/th/id/R.51305ff156a3373d563c1093e4bdf0c8?rik=UlaRqwgY2TgNvg&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/R.51305ff156a3373d563c1093e4bdf0c8?rik=UlaRqwgY2TgNvg&pid=ImgRaw&r=0', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(11, 'Cómo Entrenar a tu Dragón', 'March 26, 2010', 2010, 98, 'PG', 4.5, 'Un joven vikingo que aspira a cazar dragones se hace amigo de un dragón legendario y aprende que hay más en las criaturas de lo que pensaba.', 'https://tse4.mm.bing.net/th/id/OIP.EGENDUFtDhhdz9vM0qJNFgHaLH?rs=1&pid=ImgDetMain&o=7&rm=3', 'https://tse4.mm.bing.net/th/id/OIP.EGENDUFtDhhdz9vM0qJNFgHaLH?rs=1&pid=ImgDetMain&o=7&rm=3', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(12, 'Godzilla', 'May 14, 2014', 2014, 123, 'PG-13', 3.7, 'La humanidad lucha por sobrevivir cuando monstruos gigantes, conocidos como MUTOs, se levantan para desafiar el dominio de Godzilla.', 'https://image.tmdb.org/t/p/original/1t0FcqSsBs51PDhDkFd7EiEytU6.jpg', 'https://image.tmdb.org/t/p/original/1t0FcqSsBs51PDhDkFd7EiEytU6.jpg', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(13, 'John Wick', 'October 24, 2014', 2014, 101, 'R', 4.0, 'Un ex asesino busca venganza contra los gánsteres que mataron a su perro, un regalo de su difunta esposa.', 'https://th.bing.com/th/id/OIP.bacb4gLuvXQpcAFpO7Q9hgHaLH?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.bacb4gLuvXQpcAFpO7Q9hgHaLH?rs=1&pid=ImgDetMain', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(14, 'Hombres de Negro', 'July 2, 1997', 1997, 98, 'PG-13', 4.1, 'Dos agentes de una organización secreta que supervisa la actividad extraterrestre en la Tierra deben evitar que un terrorista alienígena destruya el planeta.', 'https://tse4.mm.bing.net/th/id/OIP.xyugdGOFp8FZRSYmkhp0vAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3', 'https://tse4.mm.bing.net/th/id/OIP.xyugdGOFp8FZRSYmkhp0vAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(15, 'Watchmen', 'March 6, 2009', 2009, 163, 'R', 4.2, 'En una realidad alternativa de 1985, un grupo de superhéroes retirados investiga el asesinato de uno de sus miembros y descubre una conspiración que podría cambiar el curso de la historia.', 'https://tse2.mm.bing.net/th/id/OIP.pfJqWFqv6PHuborNFuLpygHaLb?rs=1&pid=ImgDetMain&o=7&rm=3', 'https://tse2.mm.bing.net/th/id/OIP.pfJqWFqv6PHuborNFuLpygHaLb?rs=1&pid=ImgDetMain&o=7&rm=3', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(16, 'X-Men', 'July 14, 2000', 2000, 104, 'PG-13', 3.9, 'Un grupo de mutantes con habilidades extraordinarias lucha por proteger a la humanidad de una amenaza mutante radical.', 'https://th.bing.com/th/id/R.70a2f9351cdd6a0fc91ed5dffc14ef49?rik=Vc%2fgIvcAxwrIqA&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/R.70a2f9351cdd6a0fc91ed5dffc14ef49?rik=Vc%2fgIvcAxwrIqA&pid=ImgRaw&r=0', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(17, 'Tren Bala', 'August 5, 2022', 2022, 127, 'R', 3.6, 'Un asesino a sueldo llamado Ladybug se encuentra con otros asesinos a sueldo para proteger a una niña de un grupo de gánsteres que la quieren secuestrar.', 'https://www.themoviedb.org/t/p/original/tnPGFoeQpLznLplytqPjmvRIJ2F.jpg', 'https://www.themoviedb.org/t/p/original/tnPGFoeQpLznLplytqPjmvRIJ2F.jpg', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(18, 'Parásitos', 'May 30, 2019', 2019, 132, 'R', 4.8, 'La familia de Ki-taek está muy unida, pero todos están desempleados. Sin ninguna perspectiva de futuro, el hijo mayor, Ki-woo, es recomendado por su amigo, un estudiante de una prestigiosa universidad, para un trabajo bien pagado como tutor, lo que da inicio a una retahíla de encuentros.', 'https://th.bing.com/th/id/OIP.0KZ917k5v8OgYflOwX_vhQHaEL?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.0KZ917k5v8OgYflOwX_vhQHaEL?rs=1&pid=ImgDetMain', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(19, 'El viaje de Chihiro', 'July 20, 2001', 2001, 125, 'PG', 4.8, 'Chihiro y sus padres se ven obligados a detenerse en un túnel misterioso que lleva a otro mundo. Allí, sus padres son convertidos en cerdos y Chihiro se ve obligada a trabajar en una casa de baños para espíritus para sobrevivir.', 'https://image.tmdb.org/t/p/original/vlsi5iZcfDChKNGNvRp7Zp3SULH.jpg', 'https://image.tmdb.org/t/p/original/vlsi5iZcfDChKNGNvRp7Zp3SULH.jpg', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(20, 'El Señor de los Anillos: La Comunidad del Anillo', 'December 19, 2001', 2001, 178, 'PG-13', 4.7, 'Un hobbit de la tranquila Comarca y un mago se embarcan en una épica aventura para destruir un anillo mágico y evitar que el Señor Oscuro Sauron conquiste la Tierra Media.', 'https://images-na.ssl-images-amazon.com/images/I/816QLZKwmIL.jpg', 'https://images-na.ssl-images-amazon.com/images/I/816QLZKwmIL.jpg', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(21, 'La La Land', 'December 9, 2016', 2016, 128, 'PG-13', 4.5, 'Una aspirante a actriz y un pianista de jazz se enamoran mientras persiguen sus sueños en Los Ángeles.', 'https://th.bing.com/th/id/OIP.51jQD4ilf8uWPR6xFlGb7wHaLH?w=186&h=279&c=7&r=0&o=5&pid=1.7', 'https://th.bing.com/th/id/OIP.51jQD4ilf8uWPR6xFlGb7wHaLH?w=186&h=279&c=7&r=0&o=5&pid=1.7', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(22, 'El Castillo Ambulante', 'November 20, 2004', 2004, 119, 'PG', 4.7, 'Una joven llamada Sophie es maldecida por una bruja y convertida en anciana. Busca la ayuda de un mago llamado Howl y se ve envuelta en una guerra mágica.', 'https://www.themoviedb.org/t/p/original/5sSMmeqM3jdCtQWBFsqvfbEIsL7.jpg', 'https://www.themoviedb.org/t/p/original/5sSMmeqM3jdCtQWBFsqvfbEIsL7.jpg', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(23, 'El Club de la Lucha', 'October 15, 1999', 1999, 139, 'R', 4.6, 'Un hombre insomne y un vendedor de jabón forman un club de lucha clandestino que se convierte en mucho más de lo que esperaban.', 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/Fight_Club_poster.jpg/220px-Fight_Club_poster.jpg', 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/Fight_Club_poster.jpg/220px-Fight_Club_poster.jpg', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(24, 'El Padrino', 'March 24, 1972', 1972, 175, 'R', 4.7, 'La historia de la familia Corleone, una poderosa familia de la mafia italiana en Nueva York, y su ascenso al poder.', 'https://th.bing.com/th/id/R.f97ecf62eef2b3b57ba71192b309d738?rik=5cz8Hu39N6ZUHw&riu=http%3a%2f%2fdiariodeunacinefila.files.wordpress.com%2f2011%2f09%2fposter-de-el-padrino.jpg&ehk=WhgwF6xslFBh0RB%2f4n9G10tz%2fhYQjMig7nL8t%2bt9DHE%3d&risl=&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/R.f97ecf62eef2b3b57ba71192b309d738?rik=5cz8Hu39N6ZUHw&riu=http%3a%2f%2fdiariodeunacinefila.files.wordpress.com%2f2011%2f09%2fposter-de-el-padrino.jpg&ehk=WhgwF6xslFBh0RB%2f4n9G10tz%2fhYQjMig7nL8t%2bt9DHE%3d&risl=&pid=ImgRaw&r=0', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(25, 'Forrest Gump', 'July 6, 1994', 1994, 142, 'PG-13', 4.6, 'La historia de un hombre con un coeficiente intelectual bajo que vive una vida extraordinaria, presenciando y participando en algunos de los eventos más importantes de la historia de Estados Unidos.', 'https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Forrest_Gump_poster.jpg/220px-Forrest_Gump_poster.jpg', 'https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Forrest_Gump_poster.jpg/220px-Forrest_Gump_poster.jpg', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(26, 'Matrix', 'March 31, 1999', 1999, 136, 'R', 4.7, 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', 'https://www.themoviedb.org/t/p/original/aOIuZAjPaRIE6CMzbazvcHuHXDc.jpg', 'https://www.themoviedb.org/t/p/original/aOIuZAjPaRIE6CMzbazvcHuHXDc.jpg', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(27, 'El Silencio de los Corderos', 'February 14, 1991', 1991, 118, 'R', 4.5, 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a disturbed skinning murderer.', 'https://th.bing.com/th/id/R.83648afbf4854e5dcb0a487459232ea9?rik=%2bUA1v6M16msEWw&riu=http%3a%2f%2fwww.cartelesmix.com%2fcarteles%2fcarteles%2fletras%2fsilenciocorderos11.jpg&ehk=NmaLxo6HgeKKGs0nSK4iQFeMNLLPJsWr2n%2fU1YFObck%3d&risl=&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/R.83648afbf4854e5dcb0a487459232ea9?rik=%2bUA1v6M16msEWw&riu=http%3a%2f%2fwww.cartelesmix.com%2fcarteles%2fcarteles%2fletras%2fsilenciocorderos11.jpg&ehk=NmaLxo6HgeKKGs0nSK4iQFeMNLLPJsWr2n%2fU1YFObck%3d&risl=&pid=ImgRaw&r=0', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(28, 'Memento', 'September 5, 2000', 2000, 113, 'R', 4.6, 'A man with short-term memory loss attempts to track down his wife''s killer.', 'https://th.bing.com/th/id/OIP.DOMT-C0e9hysmxYwqq-s6gHaKX?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.DOMT-C0e9hysmxYwqq-s6gHaKX?rs=1&pid=ImgDetMain', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(29, 'Asesinato en el Expreso de Oriente', 'November 3, 2017', 2017, 114, 'PG-13', 4.1, 'In 1930s, a detective investigates the murder of an American tycoon aboard a lavish train traveling through Europe.', 'https://th.bing.com/th/id/R.cceb6b9ac8e6fc80b1320a8ede0e1bb4?rik=6gRJag%2fLMPtmGw&riu=http%3a%2f%2fes.web.img3.acsta.net%2fpictures%2f17%2f07%2f05%2f09%2f37%2f477704.jpg&ehk=OVUd%2f7kX8t8zMyaa8KcuHymrJ8jQt%2fOzO7%2fDbZCoFyU%3d&risl=&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/R.cceb6b9ac8e6fc80b1320a8ede0e1bb4?rik=6gRJag%2fLMPtmGw&riu=http%3a%2f%2fes.web.img3.acsta.net%2fpictures%2f17%2f07%2f05%2f09%2f37%2f477704.jpg&ehk=OVUd%2f7kX8t8zMyaa8KcuHymrJ8jQt%2fOzO7%2fDbZCoFyU%3d&risl=&pid=ImgRaw&r=0', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(30, 'La Naranja Mecánica', 'December 19, 1971', 1971, 136, 'R', 4.4, 'In a future Britain, charismatic and psychopathic delinquent Alex DeLarge is jailed and volunteers for an experimental aversion therapy developed by the government in an effort to reduce crime.', 'https://th.bing.com/th/id/OIP.k7iY9B2Ij7c3ooHSisIIEgHaLM?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.k7iY9B2Ij7c3ooHSisIIEgHaLM?rs=1&pid=ImgDetMain', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(31, 'Blade Runner 2049', 'October 6, 2017', 2017, 164, 'R', 4.5, 'A young blade runner''s discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who''s been missing for thirty years.', 'https://th.bing.com/th/id/R.2c16c35610053ec14da2705309c18597?rik=sYFEA%2bdaDzjFSA&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/R.2c16c35610053ec14da2705309c18597?rik=sYFEA%2bdaDzjFSA&pid=ImgRaw&r=0', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(32, 'La Princesa Mononoke', 'July 12, 1997', 1997, 134, 'PG-13', 4.8, 'On a journey to find the cure for a Tatarigami curse, Ashitaka finds himself in the middle of a war between the forest gods and a mining colony. In the struggle to reconcile the two sides, he also meets San, the Princess Mononoke.', 'https://wallpapercave.com/wp/wp4108308.jpg', 'https://wallpapercave.com/wp/wp4108308.jpg', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(33, 'La Llegada', 'November 11, 2016', 2016, 116, 'PG-13', 4.4, 'A linguist is recruited by the military to assist in translating alien communications after twelve mysterious spacecraft land around the world.', 'https://tse4.mm.bing.net/th/id/OIP.PGri9UDggRLzQ0yTf3wXpAHaKr?rs=1&pid=ImgDetMain&o=7&rm=3', 'https://tse4.mm.bing.net/th/id/OIP.PGri9UDggRLzQ0yTf3wXpAHaKr?rs=1&pid=ImgDetMain&o=7&rm=3', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(34, 'Knives Out', 'November 11, 2023', 2023, 116, 'PG-13', 4.9, 'A linguist is recruited by the military to assist in translating alien communications after twelve mysterious spacecraft land around the world.', 'https://tse1.mm.bing.net/th/id/OIP.Wa_BXcNfNWzVSN9RLmq2bwHaLG?rs=1&pid=ImgDetMain&o=7&rm=3', 'https://tse1.mm.bing.net/th/id/OIP.Wa_BXcNfNWzVSN9RLmq2bwHaLG?rs=1&pid=ImgDetMain&o=7&rm=3', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(35, 'Kimetsu no Yaiba: Castillo infinito', 'November 11, 2024', 2024, 116, 'PG-13', 4.8, 'A linguist is recruited by the military to assist in translating alien communications after twelve mysterious spacecraft land around the world.', 'https://palomaynacho.com/wp-content/uploads/2024/06/Demon-Slayer-trilogia.jpg', 'https://palomaynacho.com/wp-content/uploads/2024/06/Demon-Slayer-trilogia.jpg', 'https://www.youtube.com/watch?v=x7uLutVRBfI'),
(36, 'Deadpool 2', 'June 1, 2018', 2018, 119, 'R', 5.0, 'A linguist is recruited by the military to assist in translating alien communications after twelve mysterious spacecraft land around the world.', 'https://cdnb.artstation.com/p/assets/images/images/036/976/157/large/ismael-fofana-deadpool-2-movie-poster-design.jpg?1619123645', 'https://cdnb.artstation.com/p/assets/images/images/036/976/157/large/ismael-fofana-deadpool-2-movie-poster-design.jpg?1619123645', 'https://www.youtube.com/watch?v=x7uLutVRBfI')
ON CONFLICT (id) DO NOTHING;

-- Insertar relaciones entre películas y géneros
INSERT INTO movie_genres (movie_id, genre_id) VALUES
-- Poor Things
(1, (SELECT id FROM genres WHERE name = 'Drama')),
(1, (SELECT id FROM genres WHERE name = 'Sci-Fi')),
(1, (SELECT id FROM genres WHERE name = 'Fantasy')),

-- Ready Player One
(2, (SELECT id FROM genres WHERE name = 'Action')),
(2, (SELECT id FROM genres WHERE name = 'Sci-Fi')),
(2, (SELECT id FROM genres WHERE name = 'Adventure')),
(2, (SELECT id FROM genres WHERE name = 'Fantasy')),
(2, (SELECT id FROM genres WHERE name = 'Thriller')),

-- Baby Driver
(3, (SELECT id FROM genres WHERE name = 'Action')),
(3, (SELECT id FROM genres WHERE name = 'Crime')),
(3, (SELECT id FROM genres WHERE name = 'Music')),
(3, (SELECT id FROM genres WHERE name = 'Thriller')),

-- Mad Max: Fury Road
(4, (SELECT id FROM genres WHERE name = 'Action')),
(4, (SELECT id FROM genres WHERE name = 'Adventure')),
(4, (SELECT id FROM genres WHERE name = 'Sci-Fi')),

-- Tron
(5, (SELECT id FROM genres WHERE name = 'Action')),
(5, (SELECT id FROM genres WHERE name = 'Adventure')),
(5, (SELECT id FROM genres WHERE name = 'Sci-Fi')),

-- Mi Vecino Totoro
(6, (SELECT id FROM genres WHERE name = 'Animation')),
(6, (SELECT id FROM genres WHERE name = 'Family')),
(6, (SELECT id FROM genres WHERE name = 'Fantasy')),

-- Dragon Ball Super: Broly
(7, (SELECT id FROM genres WHERE name = 'Animation')),
(7, (SELECT id FROM genres WHERE name = 'Action')),
(7, (SELECT id FROM genres WHERE name = 'Fantasy')),
(7, (SELECT id FROM genres WHERE name = 'Sci-Fi')),

-- One Piece Film: Red
(8, (SELECT id FROM genres WHERE name = 'Animation')),
(8, (SELECT id FROM genres WHERE name = 'Action')),
(8, (SELECT id FROM genres WHERE name = 'Adventure')),
(8, (SELECT id FROM genres WHERE name = 'Fantasy')),

-- Los Ilusionistas
(9, (SELECT id FROM genres WHERE name = 'Crime')),
(9, (SELECT id FROM genres WHERE name = 'Mystery')),
(9, (SELECT id FROM genres WHERE name = 'Thriller')),

-- Kingsman: El Círculo Dorado
(10, (SELECT id FROM genres WHERE name = 'Action')),
(10, (SELECT id FROM genres WHERE name = 'Adventure')),
(10, (SELECT id FROM genres WHERE name = 'Comedy')),

-- Cómo Entrenar a tu Dragón
(11, (SELECT id FROM genres WHERE name = 'Animation')),
(11, (SELECT id FROM genres WHERE name = 'Adventure')),
(11, (SELECT id FROM genres WHERE name = 'Family')),

-- Godzilla
(12, (SELECT id FROM genres WHERE name = 'Action')),
(12, (SELECT id FROM genres WHERE name = 'Adventure')),
(12, (SELECT id FROM genres WHERE name = 'Sci-Fi')),

-- John Wick
(13, (SELECT id FROM genres WHERE name = 'Action')),
(13, (SELECT id FROM genres WHERE name = 'Thriller')),

-- Hombres de Negro
(14, (SELECT id FROM genres WHERE name = 'Action')),
(14, (SELECT id FROM genres WHERE name = 'Adventure')),
(14, (SELECT id FROM genres WHERE name = 'Comedy')),

-- Watchmen
(15, (SELECT id FROM genres WHERE name = 'Action')),
(15, (SELECT id FROM genres WHERE name = 'Drama')),
(15, (SELECT id FROM genres WHERE name = 'Mystery')),

-- X-Men
(16, (SELECT id FROM genres WHERE name = 'Action')),
(16, (SELECT id FROM genres WHERE name = 'Adventure')),
(16, (SELECT id FROM genres WHERE name = 'Sci-Fi')),

-- Tren Bala
(17, (SELECT id FROM genres WHERE name = 'Action')),
(17, (SELECT id FROM genres WHERE name = 'Comedy')),
(17, (SELECT id FROM genres WHERE name = 'Thriller')),

-- Parásitos
(18, (SELECT id FROM genres WHERE name = 'Drama')),
(18, (SELECT id FROM genres WHERE name = 'Thriller')),
(18, (SELECT id FROM genres WHERE name = 'Comedy')),

-- El viaje de Chihiro
(19, (SELECT id FROM genres WHERE name = 'Animation')),
(19, (SELECT id FROM genres WHERE name = 'Adventure')),
(19, (SELECT id FROM genres WHERE name = 'Family')),
(19, (SELECT id FROM genres WHERE name = 'Fantasy')),

-- El Señor de los Anillos: La Comunidad del Anillo
(20, (SELECT id FROM genres WHERE name = 'Adventure')),
(20, (SELECT id FROM genres WHERE name = 'Fantasy')),
(20, (SELECT id FROM genres WHERE name = 'Action')),

-- La La Land
(21, (SELECT id FROM genres WHERE name = 'Comedy')),
(21, (SELECT id FROM genres WHERE name = 'Drama')),
(21, (SELECT id FROM genres WHERE name = 'Romance')),

-- El Castillo Ambulante
(22, (SELECT id FROM genres WHERE name = 'Fantasy')),
(22, (SELECT id FROM genres WHERE name = 'Animation')),
(22, (SELECT id FROM genres WHERE name = 'Adventure')),

-- El Club de la Lucha
(23, (SELECT id FROM genres WHERE name = 'Drama')),

-- El Padrino
(24, (SELECT id FROM genres WHERE name = 'Drama')),
(24, (SELECT id FROM genres WHERE name = 'Crime')),

-- Forrest Gump
(25, (SELECT id FROM genres WHERE name = 'Comedy')),
(25, (SELECT id FROM genres WHERE name = 'Drama')),
(25, (SELECT id FROM genres WHERE name = 'Romance')),

-- Matrix
(26, (SELECT id FROM genres WHERE name = 'Action')),
(26, (SELECT id FROM genres WHERE name = 'Sci-Fi')),

-- El Silencio de los Corderos
(27, (SELECT id FROM genres WHERE name = 'Crime')),
(27, (SELECT id FROM genres WHERE name = 'Thriller')),

-- Memento
(28, (SELECT id FROM genres WHERE name = 'Mystery')),
(28, (SELECT id FROM genres WHERE name = 'Thriller')),

-- Asesinato en el Expreso de Oriente
(29, (SELECT id FROM genres WHERE name = 'Crime')),
(29, (SELECT id FROM genres WHERE name = 'Drama')),
(29, (SELECT id FROM genres WHERE name = 'Mystery')),

-- La Naranja Mecánica
(30, (SELECT id FROM genres WHERE name = 'Crime')),
(30, (SELECT id FROM genres WHERE name = 'Drama')),
(30, (SELECT id FROM genres WHERE name = 'Sci-Fi')),

-- Blade Runner 2049
(31, (SELECT id FROM genres WHERE name = 'Sci-Fi')),
(31, (SELECT id FROM genres WHERE name = 'Thriller')),

-- La Princesa Mononoke
(32, (SELECT id FROM genres WHERE name = 'Animation')),
(32, (SELECT id FROM genres WHERE name = 'Adventure')),
(32, (SELECT id FROM genres WHERE name = 'Fantasy')),

-- La Llegada
(33, (SELECT id FROM genres WHERE name = 'Drama')),
(33, (SELECT id FROM genres WHERE name = 'Sci-Fi')),
(33, (SELECT id FROM genres WHERE name = 'Thriller')),

-- Knives Out
(34, (SELECT id FROM genres WHERE name = 'Drama')),
(34, (SELECT id FROM genres WHERE name = 'Sci-Fi')),
(34, (SELECT id FROM genres WHERE name = 'Thriller')),

-- Kimetsu no Yaiba: Castillo infinito
(35, (SELECT id FROM genres WHERE name = 'Drama')),
(35, (SELECT id FROM genres WHERE name = 'Sci-Fi')),
(35, (SELECT id FROM genres WHERE name = 'Thriller')),

-- Deadpool 2
(36, (SELECT id FROM genres WHERE name = 'Drama')),
(36, (SELECT id FROM genres WHERE name = 'Sci-Fi')),
(36, (SELECT id FROM genres WHERE name = 'Thriller'))
ON CONFLICT (movie_id, genre_id) DO NOTHING;

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_movies_title ON movies(title);
CREATE INDEX IF NOT EXISTS idx_movies_release_year ON movies(release_year);
CREATE INDEX IF NOT EXISTS idx_movies_rating ON movies(rating);
CREATE INDEX IF NOT EXISTS idx_movie_genres_movie_id ON movie_genres(movie_id);
CREATE INDEX IF NOT EXISTS idx_movie_genres_genre_id ON movie_genres(genre_id);

-- Verificar que los datos se insertaron correctamente
SELECT 'Películas insertadas:' as info, COUNT(*) as count FROM movies
UNION ALL
SELECT 'Géneros insertados:', COUNT(*) FROM genres
UNION ALL
SELECT 'Relaciones película-género:', COUNT(*) FROM movie_genres; 