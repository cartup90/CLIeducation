// Virtual In-Memory Filesystem Sandbox for CLI Teacher

export function createInitialFS(structure = null) {
  if (structure) return JSON.parse(JSON.stringify(structure));
  return {
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
              'bienvenida.txt': {
                name: 'bienvenida.txt',
                type: 'file',
                content: '¡Hola recluta! Bienvenido a la Terminal de la Isla. Usa el comando "ayuda" o "help" para ver qué puedes hacer.'
              }
            }
          },
          bosque: {
            name: 'bosque',
            type: 'directory',
            children: {
              'mapa_antiguo.txt': {
                name: 'mapa_antiguo.txt',
                type: 'file',
                content: 'Coordenadas del tesoro oculto: Sigue el comando entrar cueva.'
              }
            }
          }
        }
      }
    }
  };
}

export class VirtualFS {
  constructor(initialTree = null, initialPath = '/isla/centro') {
    this.root = initialTree ? JSON.parse(JSON.stringify(initialTree)) : createInitialFS();
    this.currentPath = initialPath;
  }

  // Get current node at path
  getNode(pathStr) {
    const parts = this.resolvePathParts(pathStr);
    let curr = this.root;
    for (const part of parts) {
      if (!curr || curr.type !== 'directory' || !curr.children[part]) {
        return null;
      }
      curr = curr.children[part];
    }
    return curr;
  }

  // Resolve absolute path parts array
  resolvePathParts(pathStr) {
    let target = pathStr.startsWith('/') ? pathStr : `${this.currentPath}/${pathStr}`;
    const rawParts = target.split('/').filter(Boolean);
    const resolved = [];
    for (const p of rawParts) {
      if (p === '.') continue;
      if (p === '..') {
        resolved.pop();
      } else {
        resolved.push(p);
      }
    }
    return resolved;
  }

  // Convert path parts array to string
  partsToPath(parts) {
    return '/' + parts.join('/');
  }

  getCurrentNode() {
    return this.getNode(this.currentPath);
  }

  // Comandos / Commands implementations
  pwddondeEstoy() {
    return this.currentPath;
  }

  listar(pathArg = '') {
    const targetPath = pathArg ? this.resolvePathParts(pathArg) : this.resolvePathParts(this.currentPath);
    const node = this.getNode(this.partsToPath(targetPath));

    if (!node) {
      return { success: false, output: `Error: El directorio '${pathArg}' no existe.` };
    }
    if (node.type !== 'directory') {
      return { success: false, output: `Error: '${pathArg}' es un archivo, no una carpeta.` };
    }

    const items = Object.values(node.children).map(child => ({
      name: child.name,
      type: child.type,
      size: child.type === 'file' ? `${child.content ? child.content.length : 0} bytes` : '-'
    }));

    if (items.length === 0) {
      return { success: true, output: '(Carpeta vacía)', items: [] };
    }

    const outputText = items.map(item => `${item.type === 'directory' ? '📁 [DIR]' : '📄 [FILE]'} ${item.name}`).join('\n');
    return { success: true, output: outputText, items };
  }

  entrar(dirName) {
    if (!dirName) {
      return { success: false, output: 'Uso: entrar <nombre_carpeta>  (Ej: entrar bosque  o  entrar ..)' };
    }

    const targetParts = this.resolvePathParts(dirName);
    const targetPathStr = this.partsToPath(targetParts);
    const node = this.getNode(targetPathStr);

    if (!node) {
      return { success: false, output: `Error: No se encontró la carpeta '${dirName}'. Revisa si escribiste bien el nombre con 'listar'.` };
    }
    if (node.type !== 'directory') {
      return { success: false, output: `Error: '${dirName}' no es una carpeta, es un archivo.` };
    }

    this.currentPath = targetPathStr;
    return { success: true, output: `Navegaste a: ${this.currentPath}` };
  }

  crearCarpeta(name) {
    if (!name) {
      return { success: false, output: 'Uso: crear_carpeta <nombre>  (Ej: crear_carpeta tesoro)' };
    }
    if (name.includes('/')) {
      return { success: false, output: 'Error: El nombre de la carpeta no debe incluir "/"' };
    }

    const currentDir = this.getCurrentNode();
    if (currentDir.children[name]) {
      return { success: false, output: `Error: Ya existe un elemento llamado '${name}' en esta carpeta.` };
    }

    currentDir.children[name] = {
      name,
      type: 'directory',
      children: {}
    };

    return { success: true, output: `✨ Carpeta creada con éxito: 📁 ${name}` };
  }

  crearArchivo(name, content = '') {
    if (!name) {
      return { success: false, output: 'Uso: crear_archivo <nombre>  (Ej: crear_archivo notas.txt)' };
    }

    const currentDir = this.getCurrentNode();
    if (currentDir.children[name]) {
      return { success: false, output: `Error: Ya existe un archivo llamado '${name}'.` };
    }

    currentDir.children[name] = {
      name,
      type: 'file',
      content: content || 'Archivo creado por el estudiante.'
    };

    return { success: true, output: `📄 Archivo creado con éxito: ${name}` };
  }

  leerArchivo(name) {
    if (!name) {
      return { success: false, output: 'Uso: leer_archivo <nombre_archivo>  (Ej: leer_archivo mapa.txt)' };
    }

    const currentDir = this.getCurrentNode();
    const fileNode = currentDir.children[name];

    if (!fileNode) {
      return { success: false, output: `Error: No existe el archivo '${name}' en la carpeta actual.` };
    }
    if (fileNode.type !== 'file') {
      return { success: false, output: `Error: '${name}' es una carpeta, no un archivo de texto.` };
    }

    return { success: true, output: fileNode.content || '(Archivo vacío)' };
  }

  renombrar(oldName, newName) {
    if (!oldName || !newName) {
      return { success: false, output: 'Uso: renombrar <nombre_actual> <nuevo_nombre>' };
    }

    const currentDir = this.getCurrentNode();
    if (!currentDir.children[oldName]) {
      return { success: false, output: `Error: No existe '${oldName}' en esta carpeta.` };
    }
    if (currentDir.children[newName]) {
      return { success: false, output: `Error: Ya existe un elemento con el nombre '${newName}'.` };
    }

    const item = currentDir.children[oldName];
    delete currentDir.children[oldName];
    item.name = newName;
    currentDir.children[newName] = item;

    return { success: true, output: `Renombrado '${oldName}' a '${newName}' correctamente.` };
  }

  mover(srcName, destFolder) {
    if (!srcName || !destFolder) {
      return { success: false, output: 'Uso: mover <archivo_o_carpeta> <carpeta_destino>' };
    }

    const currentDir = this.getCurrentNode();
    const item = currentDir.children[srcName];
    if (!item) {
      return { success: false, output: `Error: No se encontró '${srcName}' en la carpeta actual.` };
    }

    const destParts = this.resolvePathParts(destFolder);
    const destNode = this.getNode(this.partsToPath(destParts));

    if (!destNode || destNode.type !== 'directory') {
      return { success: false, output: `Error: La carpeta destino '${destFolder}' no existe.` };
    }

    if (destNode.children[srcName]) {
      return { success: false, output: `Error: Ya existe '${srcName}' en la carpeta destino.` };
    }

    delete currentDir.children[srcName];
    destNode.children[srcName] = item;

    return { success: true, output: `Movido '${srcName}' a '${destFolder}' con éxito.` };
  }

  copiar(srcName, destFolder) {
    if (!srcName || !destFolder) {
      return { success: false, output: 'Uso: copiar <archivo> <carpeta_destino>' };
    }

    const currentDir = this.getCurrentNode();
    const item = currentDir.children[srcName];
    if (!item) {
      return { success: false, output: `Error: No se encontró '${srcName}'.` };
    }
    if (item.type !== 'file') {
      return { success: false, output: `Error: Solo se pueden copiar archivos en esta versión.` };
    }

    const destParts = this.resolvePathParts(destFolder);
    const destNode = this.getNode(this.partsToPath(destParts));

    if (!destNode || destNode.type !== 'directory') {
      return { success: false, output: `Error: La carpeta destino '${destFolder}' no existe.` };
    }

    destNode.children[srcName] = {
      name: item.name,
      type: 'file',
      content: item.content
    };

    return { success: true, output: `Copiado '${srcName}' en '${destFolder}' correctamente.` };
  }

  eliminar(name) {
    if (!name) {
      return { success: false, output: 'Uso: eliminar <nombre_archivo_o_carpeta>' };
    }

    const currentDir = this.getCurrentNode();
    if (!currentDir.children[name]) {
      return { success: false, output: `Error: No existe '${name}' en la carpeta actual.` };
    }

    delete currentDir.children[name];
    return { success: true, output: `🗑️ Se eliminó '${name}' correctamente.` };
  }
}
