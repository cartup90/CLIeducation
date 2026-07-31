// Real OS Commands Data definitions (Linux/macOS Bash/Zsh & Windows CMD)

export const OS_COMMANDS_DATA = [
  {
    id: 'pwd',
    category: 'Navegación',
    summary: 'Muestra la ruta de la carpeta actual.',
    osDetails: {
      linux: { cmd: 'pwd', usage: 'pwd', example: 'pwd', desc: 'Print Working Directory. Muestra la ubicación actual.' },
      windows: { cmd: 'cd', usage: 'cd', example: 'cd', desc: 'Ejecutar "cd" sin argumentos en Windows muestra la carpeta actual.' },
      macos: { cmd: 'pwd', usage: 'pwd', example: 'pwd', desc: 'Print Working Directory en la terminal de macOS.' }
    }
  },
  {
    id: 'ls',
    category: 'Navegación',
    summary: 'Muestra la lista de archivos y subcarpetas.',
    osDetails: {
      linux: { cmd: 'ls', usage: 'ls', example: 'ls', desc: 'List files. Muestra el contenido del directorio.' },
      windows: { cmd: 'dir', usage: 'dir', example: 'dir', desc: 'Directory list. Muestra la lista de archivos y carpetas.' },
      macos: { cmd: 'ls', usage: 'ls', example: 'ls', desc: 'List files en Zsh / macOS.' }
    }
  },
  {
    id: 'cd',
    category: 'Navegación',
    summary: 'Cambia de carpeta o regresa hacia atrás.',
    osDetails: {
      linux: { cmd: 'cd', usage: 'cd <carpeta> | cd ..', example: 'cd cueva', desc: 'Change Directory. Entra a una carpeta o sube con "cd ..".' },
      windows: { cmd: 'cd', usage: 'cd <carpeta> | cd ..', example: 'cd cueva', desc: 'Change Directory en la consola de comandos de Windows.' },
      macos: { cmd: 'cd', usage: 'cd <carpeta> | cd ..', example: 'cd cueva', desc: 'Change Directory en la terminal de macOS.' }
    }
  },
  {
    id: 'mkdir',
    category: 'Creación',
    summary: 'Crea una nueva carpeta.',
    osDetails: {
      linux: { cmd: 'mkdir', usage: 'mkdir <nombre>', example: 'mkdir tesoro', desc: 'Make Directory. Crea una nueva carpeta en Linux.' },
      windows: { cmd: 'mkdir', usage: 'mkdir <nombre> | md <nombre>', example: 'mkdir tesoro', desc: 'Make Directory o "md" en CMD de Windows.' },
      macos: { cmd: 'mkdir', usage: 'mkdir <nombre>', example: 'mkdir tesoro', desc: 'Make Directory en macOS.' }
    }
  },
  {
    id: 'touch',
    category: 'Creación',
    summary: 'Crea un nuevo archivo vacío.',
    osDetails: {
      linux: { cmd: 'touch', usage: 'touch <archivo>', example: 'touch diario.txt', desc: 'Crea un nuevo archivo de texto en Linux.' },
      windows: { cmd: 'type', usage: 'touch <archivo> | echo. > <archivo>', example: 'touch diario.txt', desc: 'En Windows se apoya touch o echo.' },
      macos: { cmd: 'touch', usage: 'touch <archivo>', example: 'touch diario.txt', desc: 'Crea un archivo vacío en macOS.' }
    }
  },
  {
    id: 'cat',
    category: 'Lectura',
    summary: 'Muestra el contenido de un archivo.',
    osDetails: {
      linux: { cmd: 'cat', usage: 'cat <archivo>', example: 'cat bienvenida.txt', desc: 'Concatenate & Print file content en Linux.' },
      windows: { cmd: 'type', usage: 'type <archivo>', example: 'type bienvenida.txt', desc: 'Muestra el contenido de texto de un archivo en Windows.' },
      macos: { cmd: 'cat', usage: 'cat <archivo>', example: 'cat bienvenida.txt', desc: 'Muestra el contenido de un archivo en macOS.' }
    }
  },
  {
    id: 'renombrar',
    category: 'Manipulación',
    summary: 'Cambia el nombre de un archivo o carpeta.',
    osDetails: {
      linux: { cmd: 'mv', usage: 'mv <actual> <nuevo>', example: 'mv viejo.txt nuevo.txt', desc: 'Move/Rename en Linux.' },
      windows: { cmd: 'ren', usage: 'ren <actual> <nuevo> | rename', example: 'ren viejo.txt nuevo.txt', desc: 'Rename en Windows CMD.' },
      macos: { cmd: 'mv', usage: 'mv <actual> <nuevo>', example: 'mv viejo.txt nuevo.txt', desc: 'Move/Rename en macOS.' }
    }
  },
  {
    id: 'mover',
    category: 'Manipulación',
    summary: 'Mueve un archivo a otra carpeta.',
    osDetails: {
      linux: { cmd: 'mv', usage: 'mv <archivo> <destino>', example: 'mv mapa.txt cueva', desc: 'Mueve un archivo a una subcarpeta.' },
      windows: { cmd: 'move', usage: 'move <archivo> <destino>', example: 'move mapa.txt cueva', desc: 'Move file en Windows.' },
      macos: { cmd: 'mv', usage: 'mv <archivo> <destino>', example: 'mv mapa.txt cueva', desc: 'Move file en macOS.' }
    }
  },
  {
    id: 'copiar',
    category: 'Manipulación',
    summary: 'Duplica un archivo en otra carpeta.',
    osDetails: {
      linux: { cmd: 'cp', usage: 'cp <archivo> <destino>', example: 'cp clave.txt backup', desc: 'Copy file en Linux.' },
      windows: { cmd: 'copy', usage: 'copy <archivo> <destino>', example: 'copy clave.txt backup', desc: 'Copy file en Windows.' },
      macos: { cmd: 'cp', usage: 'cp <archivo> <destino>', example: 'cp clave.txt backup', desc: 'Copy file en macOS.' }
    }
  },
  {
    id: 'eliminar',
    category: 'Manipulación',
    summary: 'Borra un archivo o carpeta.',
    osDetails: {
      linux: { cmd: 'rm', usage: 'rm <archivo>', example: 'rm virus.txt', desc: 'Remove file en Linux.' },
      windows: { cmd: 'del', usage: 'del <archivo> | rmdir', example: 'del virus.txt', desc: 'Delete file en Windows.' },
      macos: { cmd: 'rm', usage: 'rm <archivo>', example: 'rm virus.txt', desc: 'Remove file en macOS.' }
    }
  },
  {
    id: 'help',
    category: 'Utilidad',
    summary: 'Muestra la ayuda de la terminal.',
    osDetails: {
      linux: { cmd: 'help', usage: 'help', example: 'help', desc: 'Muestra la lista de comandos disponibles.' },
      windows: { cmd: 'help', usage: 'help', example: 'help', desc: 'Muestra la lista de comandos de la consola de Windows.' },
      macos: { cmd: 'help', usage: 'help', example: 'help', desc: 'Muestra la lista de comandos en macOS.' }
    }
  },
  {
    id: 'clear',
    category: 'Utilidad',
    summary: 'Limpia la pantalla de la consola.',
    osDetails: {
      linux: { cmd: 'clear', usage: 'clear', example: 'clear', desc: 'Limpia la terminal Linux.' },
      windows: { cmd: 'cls', usage: 'cls', example: 'cls', desc: 'Clear Screen en la consola de Windows.' },
      macos: { cmd: 'clear', usage: 'clear', example: 'clear', desc: 'Limpia la terminal macOS.' }
    }
  }
];
