// Pedagogical Missions with OS Dynamic Adaptation & Robust Input Validation

export const getMissionNarrative = (mission, osId = 'linux') => {
  const isWindows = osId === 'windows';
  const isMac = osId === 'macos';

  switch (mission.id) {
    case 'm1-1':
      return {
        story: '¡Hola! Soy Byte, tu guía de la consola. Te han teletransportado a la Isla CLI. Antes de moverte, debes averiguar la ruta de tu ubicación actual.',
        objective: isWindows 
          ? 'Escribe el comando `cd` (o `pwd`) en la consola para saber la carpeta actual.'
          : 'Escribe el comando `pwd` en la terminal para mostrar tu ruta actual.',
        hints: isWindows ? [
          'En la consola de Windows, escribir solo "cd" muestra tu carpeta actual.',
          'También funciona "pwd" como comando estándar.',
          'Solución: Escribe "cd" o "pwd"'
        ] : [
          'Escribe el comando exacto "pwd" (Print Working Directory).',
          'Presiona la tecla Enter al finalizar.',
          'Solución: Escribe "pwd"'
        ]
      };

    case 'm1-2':
      return {
        story: 'Estás en el centro de la plaza. Para saber qué objetos y carpetas te rodean, debemos listar el contenido.',
        objective: isWindows
          ? 'Utiliza el comando `dir` (o `ls`) para ver la lista de archivos de la carpeta.'
          : 'Utiliza el comando `ls` (List) para ver todo el contenido de la carpeta actual.',
        hints: isWindows ? [
          'En Windows CMD el comando para listar es "dir".',
          'En Linux/macOS se usa "ls". Ambos funcionan.',
          'Solución: Escribe "dir" o "ls"'
        ] : [
          'El comando en Linux/macOS es "ls".',
          'Escribe "ls" en la terminal.',
          'Solución: Escribe "ls"'
        ]
      };

    case 'm1-3':
      return {
        story: 'La pantalla de la consola se está llenando de texto. Un verdadero hacker siempre mantiene limpia su terminal.',
        objective: isWindows
          ? 'Usa el comando `cls` (o `clear`) para limpiar la pantalla.'
          : 'Usa el comando `clear` (o `cls`) para vaciar la pantalla.',
        hints: isWindows ? [
          'En Windows se usa "cls" (Clear Screen).',
          'También puedes usar "clear".',
          'Solución: Escribe "cls"'
        ] : [
          'El comando es "clear".',
          'También se acepta "cls".',
          'Solución: Escribe "clear"'
        ]
      };

    case 'm2-1':
      return {
        story: 'Hay una cueva oscura cerca de ti. Debes ingresar a la carpeta `cueva` para investigar su contenido.',
        objective: 'Usa `cd cueva` (o `entrar cueva`) para moverte a la carpeta cueva.',
        hints: [
          'Para cambiar de carpeta escribe: cd cueva',
          'Para volver atrás escribirías: cd ..',
          'Solución: Escribe "cd cueva"'
        ]
      };

    case 'm2-2':
      return {
        story: 'Necesitamos un lugar donde guardar nuestros descubrimientos. Crea una carpeta llamada `base_secreta`.',
        objective: 'Usa `mkdir base_secreta` (o `md base_secreta`) para crear la carpeta.',
        hints: [
          'Recuerda el comando para crear directorios: mkdir <nombre>',
          'Escribe: mkdir base_secreta',
          'Solución: "mkdir base_secreta"'
        ]
      };

    case 'm2-3':
      return {
        story: 'Un recluta intentó ingresar a la carpeta `refugio` escribiendo `cdrefugio` pero recibió un error. ¿Puedes corregir la sintaxis?',
        objective: 'Escribe correctamente el comando para entrar en la carpeta `refugio`.',
        hints: [
          'En la línea de comandos, las instrucciones y los argumentos SIEMPRE deben separarse con un espacio.',
          'Faltó un espacio entre "cd" y "refugio".',
          'Solución: Escribe "cd refugio"'
        ]
      };

    case 'm2-4':
      return {
        story: '¡Desafío final del Mundo 2! Hay un cofre en la carpeta `laberinto/camara/tesoro`. Debes entrar hasta allá y listar su contenido.',
        objective: isWindows
          ? 'Navega por las carpetas hasta estar en `tesoro` y ejecuta `dir` (o `ls`).'
          : 'Navega por las carpetas hasta estar en `tesoro` y ejecuta `ls`.',
        hints: [
          'Primero entra a laberinto ("cd laberinto"), luego a camara, y finalmente a tesoro.',
          isWindows ? 'Una vez dentro de tesoro, ejecuta "dir".' : 'Una vez dentro de tesoro, ejecuta "ls".',
          'Solución: cd laberinto -> cd camara -> cd tesoro -> ls'
        ]
      };

    case 'm3-1':
      return {
        story: 'Es hora de documentar tu aventura. Crea un archivo llamado `diario.txt` y luego lee su contenido.',
        objective: isWindows
          ? 'Crea `diario.txt` con `touch diario.txt` (o `crear_archivo diario.txt`) y luego usa `type diario.txt` (o `cat diario.txt`).'
          : 'Crea `diario.txt` con `touch diario.txt` y luego usa `cat diario.txt`.',
        hints: [
          'Paso 1: touch diario.txt (o crear_archivo diario.txt)',
          isWindows ? 'Paso 2: type diario.txt (o cat diario.txt)' : 'Paso 2: cat diario.txt',
          'Solución: touch diario.txt -> cat diario.txt'
        ]
      };

    case 'm3-2':
      return {
        story: 'Tienes un archivo llamado `mapa_viejo.txt`. Cambia su nombre a `mapa_nuevo.txt` y muévelo a la carpeta `mochila`.',
        objective: isWindows
          ? 'Usa `ren mapa_viejo.txt mapa_nuevo.txt` (o `mv`) y luego `move mapa_nuevo.txt mochila` (o `mv`).'
          : 'Usa `mv mapa_viejo.txt mapa_nuevo.txt` y luego `mv mapa_nuevo.txt mochila`.',
        hints: [
          isWindows ? 'Paso 1: ren mapa_viejo.txt mapa_nuevo.txt' : 'Paso 1: mv mapa_viejo.txt mapa_nuevo.txt',
          isWindows ? 'Paso 2: move mapa_nuevo.txt mochila' : 'Paso 2: mv mapa_nuevo.txt mochila',
          'Solución: Ejecuta el renombramiento y luego el traslado.'
        ]
      };

    case 'm3-3':
      return {
        story: 'Los archivos importantes deben respaldarse. Realiza una copia de `codigo.txt` dentro de la carpeta `backup`.',
        objective: isWindows
          ? 'Usa `copy codigo.txt backup` (o `cp codigo.txt backup`).'
          : 'Usa `cp codigo.txt backup`.',
        hints: [
          isWindows ? 'Usa el comando: copy codigo.txt backup' : 'Usa el comando: cp codigo.txt backup',
          'Solución: Realiza la copia a la carpeta backup.'
        ]
      };

    case 'm3-4':
      return {
        story: 'Hay un archivo corrupto llamado `virus.tmp` que ocupa espacio. Elimínalo sin afectar a los demás.',
        objective: isWindows
          ? 'Usa `del virus.tmp` (o `rm virus.tmp`).'
          : 'Usa `rm virus.tmp`.',
        hints: [
          isWindows ? 'Escribe: del virus.tmp (o rm virus.tmp)' : 'Escribe: rm virus.tmp',
          'Solución: "rm virus.tmp" o "del virus.tmp"'
        ]
      };

    case 'm4-1':
      return {
        story: 'El sistema envió el error: "No se puede leer el archivo datos.txt porque no existe". Descubre cómo se llama realmente.',
        objective: isWindows
          ? 'Usa `dir` para verificar el nombre real del archivo.'
          : 'Usa `ls` para verificar el nombre real del archivo.',
        hints: [
          isWindows ? 'Ejecuta "dir" para ver la lista real.' : 'Ejecuta "ls" para ver la lista real.',
          'Luego lee el archivo datos_servidor.txt.',
          'Solución: listar los archivos y luego leer datos_servidor.txt'
        ]
      };

    case 'm4-2':
      return {
        story: '¡Emergencia! El Núcleo de la Isla está inestable. Debes: 1) Crear la carpeta `servidor`. 2) Crear el archivo `nucleo.cfg`. 3) Mover `nucleo.cfg` a la carpeta `servidor`.',
        objective: '1: `mkdir servidor` -> 2: `touch nucleo.cfg` -> 3: `mv nucleo.cfg servidor`',
        hints: [
          'Paso 1: mkdir servidor',
          'Paso 2: touch nucleo.cfg (o crear_archivo nucleo.cfg)',
          'Paso 3: mv nucleo.cfg servidor (o move nucleo.cfg servidor)',
          'Solución: Ejecuta los 3 pasos en orden.'
        ]
      };

    default:
      return { story: mission.story, objective: mission.objective, hints: mission.hints };
  }
};

export const WORLDS = [
  {
    id: 'world-1',
    number: 1,
    title: 'Isla de Bienvenida',
    subtitle: 'Primeros pasos en la Terminal',
    description: 'Aprende los primeros comandos de observación en la consola real de tu sistema operativo preferido.',
    badgeId: 'explorador_novato',
    color: 'emerald',
    icon: 'Compass',
    missions: [
      {
        id: 'm1-1',
        title: 'Misión 1: El Despertar de Byte',
        type: 'guiada',
        typeLabel: 'Misión Guiada',
        xp: 50,
        initialPath: '/isla/centro',
        validation: ({ commandHistory }) => {
          const userInputs = commandHistory.filter(c => c.type === 'input');
          if (userInputs.length === 0) return false;
          const lastCmd = userInputs[userInputs.length - 1].raw.trim().toLowerCase();
          return (
            lastCmd === 'pwd' ||
            lastCmd === 'cd' ||
            lastCmd === 'dónde_estoy' ||
            lastCmd === 'donde_estoy'
          );
        },
        successMsg: '¡Excelente! Has verificado la ruta de tu carpeta actual. ¡Tu primer comando oficial!'
      },
      {
        id: 'm1-2',
        title: 'Misión 2: Inspeccionando la Plaza',
        type: 'guiada',
        typeLabel: 'Misión Guiada',
        xp: 60,
        initialPath: '/isla/centro',
        validation: ({ commandHistory }) => {
          const userInputs = commandHistory.filter(c => c.type === 'input');
          if (userInputs.length === 0) return false;
          const lastCmd = userInputs[userInputs.length - 1].raw.trim().toLowerCase();
          return (
            lastCmd === 'ls' ||
            lastCmd === 'dir' ||
            lastCmd === 'listar' ||
            lastCmd.startsWith('ls ') ||
            lastCmd.startsWith('dir ')
          );
        },
        successMsg: '¡Fabuloso! Has obtenido la lista de archivos del directorio.'
      },
      {
        id: 'm1-3',
        title: 'Misión 3: El Lienzo Limpio',
        type: 'practica',
        typeLabel: 'Práctica Libre',
        xp: 70,
        initialPath: '/isla/centro',
        validation: ({ commandHistory }) => {
          const userInputs = commandHistory.filter(c => c.type === 'input');
          if (userInputs.length === 0) return false;
          const lastCmd = userInputs[userInputs.length - 1].raw.trim().toLowerCase();
          return (
            lastCmd === 'clear' ||
            lastCmd === 'cls' ||
            lastCmd === 'limpiar'
          );
        },
        successMsg: '¡Pum! Consola impecable. ¡Felicidades por completar el Mundo 1!'
      }
    ]
  },

  {
    id: 'world-2',
    number: 2,
    title: 'El Laberinto de Carpetas',
    subtitle: 'Navegación y Jerarquía',
    description: 'Navega por el árbol de directorios y crea nuevas carpetas.',
    badgeId: 'maestro_carpetas',
    color: 'blue',
    icon: 'FolderTree',
    missions: [
      {
        id: 'm2-1',
        title: 'Misión 1: Entrando en la Cueva',
        type: 'guiada',
        typeLabel: 'Misión Guiada',
        xp: 80,
        initialPath: '/isla/centro',
        initialFS: {
          name: 'root',
          type: 'directory',
          children: {
            isla: {
              name: 'isla',
              type: 'directory',
              children: {
                centro: {
                  name: 'centro',
                  type: 'directory',
                  children: {
                    cueva: {
                      name: 'cueva',
                      type: 'directory',
                      children: {
                        'antorcha.txt': { name: 'antorcha.txt', type: 'file', content: 'Fuego protector' }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        validation: ({ currentPath }) => {
          return currentPath.endsWith('/cueva');
        },
        successMsg: '¡Has entrado a la cueva! Mira cómo cambió la ruta de la terminal.'
      },
      {
        id: 'm2-2',
        title: 'Misión 2: Construyendo la Base Secreta',
        type: 'practica',
        typeLabel: 'Práctica Libre',
        xp: 90,
        initialPath: '/isla/centro',
        validation: ({ fs }) => {
          const currentDir = fs.getCurrentNode();
          return !!(currentDir && currentDir.children && currentDir.children['base_secreta']);
        },
        successMsg: '¡Genial! Has creado tu primera carpeta.'
      },
      {
        id: 'm2-3',
        title: 'Misión 3: Detective de Sintaxis',
        type: 'detective',
        typeLabel: 'Detective de Errores',
        xp: 100,
        initialPath: '/isla/centro',
        initialFS: {
          name: 'root',
          type: 'directory',
          children: {
            isla: {
              name: 'isla',
              type: 'directory',
              children: {
                centro: {
                  name: 'centro',
                  type: 'directory',
                  children: {
                    refugio: { name: 'refugio', type: 'directory', children: {} }
                  }
                }
              }
            }
          }
        },
        validation: ({ currentPath }) => {
          return currentPath.endsWith('/refugio');
        },
        successMsg: '¡Atrapaste el error de sintaxis! El espacio entre comando y argumento es fundamental.'
      },
      {
        id: 'm2-4',
        title: 'Misión 4: El Gran Criptograma',
        type: 'boss',
        typeLabel: 'Misión Boss',
        xp: 150,
        initialPath: '/isla/centro',
        initialFS: {
          name: 'root',
          type: 'directory',
          children: {
            isla: {
              name: 'isla',
              type: 'directory',
              children: {
                centro: {
                  name: 'centro',
                  type: 'directory',
                  children: {
                    laberinto: {
                      name: 'laberinto',
                      type: 'directory',
                      children: {
                        camara: {
                          name: 'camara',
                          type: 'directory',
                          children: {
                            tesoro: {
                              name: 'tesoro',
                              type: 'directory',
                              children: {
                                'oro.txt': { name: 'oro.txt', type: 'file', content: '1000 monedas de oro' }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        validation: ({ currentPath, commandHistory }) => {
          const userInputs = commandHistory.filter(c => c.type === 'input');
          if (userInputs.length === 0) return false;
          const lastCmd = userInputs[userInputs.length - 1].raw.trim().toLowerCase();
          const isListing = lastCmd === 'ls' || lastCmd === 'dir' || lastCmd === 'listar';
          return currentPath.endsWith('/tesoro') && isListing;
        },
        successMsg: '🏆 ¡Increíble! Dominaste la navegación por carpetas y completaste el Mundo 2!'
      }
    ]
  },

  {
    id: 'world-3',
    number: 3,
    title: 'El Almacén de Archivos',
    subtitle: 'Creación, Lectura y Manipulación',
    description: 'Crear, ver, mover, renombrar, copiar y eliminar archivos.',
    badgeId: 'ninja_archivos',
    color: 'purple',
    icon: 'FileCode',
    missions: [
      {
        id: 'm3-1',
        title: 'Misión 1: Notas de Explorador',
        type: 'guiada',
        typeLabel: 'Misión Guiada',
        xp: 100,
        initialPath: '/isla/centro',
        validation: ({ fs, commandHistory }) => {
          const curr = fs.getCurrentNode();
          const hasFile = curr && curr.children && curr.children['diario.txt'];
          const userInputs = commandHistory.filter(c => c.type === 'input');
          const readDone = userInputs.some(c => {
            const raw = c.raw.toLowerCase();
            return raw.includes('cat diario.txt') || raw.includes('type diario.txt') || raw.includes('leer_archivo diario.txt');
          });
          return hasFile && readDone;
        },
        successMsg: '¡Fantástico! Has creado y leído tu primer archivo.'
      },
      {
        id: 'm3-2',
        title: 'Misión 2: Reorganizando la Mochila',
        type: 'practica',
        typeLabel: 'Práctica Libre',
        xp: 110,
        initialPath: '/isla/centro',
        initialFS: {
          name: 'root',
          type: 'directory',
          children: {
            isla: {
              name: 'isla',
              type: 'directory',
              children: {
                centro: {
                  name: 'centro',
                  type: 'directory',
                  children: {
                    'mapa_viejo.txt': { name: 'mapa_viejo.txt', type: 'file', content: 'Mapa antiguo' },
                    mochila: { name: 'mochila', type: 'directory', children: {} }
                  }
                }
              }
            }
          }
        },
        validation: ({ fs }) => {
          const moch = fs.getNode('/isla/centro/mochila');
          return !!(moch && moch.children && moch.children['mapa_nuevo.txt']);
        },
        successMsg: '¡Excelente trabajo! Organizaste tus pertenencias renombrando y moviendo archivos.'
      },
      {
        id: 'm3-3',
        title: 'Misión 3: Copia de Respaldos',
        type: 'practica',
        typeLabel: 'Práctica Libre',
        xp: 120,
        initialPath: '/isla/centro',
        initialFS: {
          name: 'root',
          type: 'directory',
          children: {
            isla: {
              name: 'isla',
              type: 'directory',
              children: {
                centro: {
                  name: 'centro',
                  type: 'directory',
                  children: {
                    'codigo.txt': { name: 'codigo.txt', type: 'file', content: 'SECRET_KEY=9988' },
                    backup: { name: 'backup', type: 'directory', children: {} }
                  }
                }
              }
            }
          }
        },
        validation: ({ fs }) => {
          const bkp = fs.getNode('/isla/centro/backup');
          const original = fs.getNode('/isla/centro');
          return !!(bkp && bkp.children['codigo.txt'] && original && original.children['codigo.txt']);
        },
        successMsg: '¡Copia creada! El archivo existe en la carpeta backup.'
      },
      {
        id: 'm3-4',
        title: 'Misión 4: Limpiando la Basura',
        type: 'practica',
        typeLabel: 'Práctica Libre',
        xp: 130,
        initialPath: '/isla/centro',
        initialFS: {
          name: 'root',
          type: 'directory',
          children: {
            isla: {
              name: 'isla',
              type: 'directory',
              children: {
                centro: {
                  name: 'centro',
                  type: 'directory',
                  children: {
                    'virus.tmp': { name: 'virus.tmp', type: 'file', content: 'Malware' },
                    'importante.txt': { name: 'importante.txt', type: 'file', content: 'Datos seguros' }
                  }
                }
              }
            }
          }
        },
        validation: ({ fs }) => {
          const curr = fs.getCurrentNode();
          return !!(curr && !curr.children['virus.tmp'] && curr.children['importante.txt']);
        },
        successMsg: '🗑️ ¡Virus eliminado! Tu sistema está limpio.'
      }
    ]
  },

  {
    id: 'world-4',
    number: 4,
    title: 'Operación Hackeo Final',
    subtitle: 'El Desafío Hacker Supremo',
    description: 'Combina todos los comandos aprendidos para restaurar el Servidor Central.',
    badgeId: 'leyenda_cli',
    color: 'amber',
    icon: 'ShieldAlert',
    missions: [
      {
        id: 'm4-1',
        title: 'Misión 1: Diagnóstico de Errores',
        type: 'detective',
        typeLabel: 'Detective de Errores',
        xp: 150,
        initialPath: '/isla/centro',
        initialFS: {
          name: 'root',
          type: 'directory',
          children: {
            isla: {
              name: 'isla',
              type: 'directory',
              children: {
                centro: {
                  name: 'centro',
                  type: 'directory',
                  children: {
                    'datos_servidor.txt': { name: 'datos_servidor.txt', type: 'file', content: 'IP: 192.168.1.1' }
                  }
                }
              }
            }
          }
        },
        validation: ({ commandHistory }) => {
          const userInputs = commandHistory.filter(c => c.type === 'input');
          return userInputs.some(c => {
            const raw = c.raw.toLowerCase();
            return raw.includes('cat datos_servidor.txt') || raw.includes('type datos_servidor.txt') || raw.includes('leer_archivo datos_servidor.txt');
          });
        },
        successMsg: '¡Diagnóstico acertado! Encontraste y leíste el archivo correcto.'
      },
      {
        id: 'm4-2',
        title: 'Misión 2: Restaurando el Núcleo (Boss Final)',
        type: 'boss',
        typeLabel: 'Desafío Boss Final',
        xp: 300,
        initialPath: '/isla/centro',
        validation: ({ fs }) => {
          const srv = fs.getNode('/isla/centro/servidor');
          return !!(srv && srv.children['nucleo.cfg']);
        },
        successMsg: '🎉 ¡LO LOGRASTE! Restauraste el Núcleo de la Isla CLI. ¡Eres oficialmente un Maestro de la Terminal!'
      }
    ]
  }
];
