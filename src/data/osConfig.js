// Operating System Configurations for CLI Teacher

export const OS_MODES = [
  {
    id: 'linux',
    name: 'Linux (Bash)',
    shortName: 'Linux',
    icon: '🐧',
    shellName: 'bash',
    promptTemplate: (path) => `estudiante@isla:~${path}$`,
    color: 'emerald',
    commands: {
      pwd: 'pwd',
      ls: 'ls',
      cd: 'cd',
      mkdir: 'mkdir',
      touch: 'touch',
      cat: 'cat',
      mv: 'mv',
      cp: 'cp',
      rm: 'rm',
      help: 'help',
      clear: 'clear'
    }
  },
  {
    id: 'windows',
    name: 'Windows (CMD / PowerShell)',
    shortName: 'Windows',
    icon: '🪟',
    shellName: 'cmd.exe',
    promptTemplate: (path) => `C:\\Users\\Estudiante${path.replace(/\//g, '\\')}>`,
    color: 'blue',
    commands: {
      pwd: 'cd',
      ls: 'dir',
      cd: 'cd',
      mkdir: 'mkdir',
      touch: 'type nul >',
      cat: 'type',
      mv: 'move',
      cp: 'copy',
      rm: 'del',
      help: 'help',
      clear: 'cls'
    }
  },
  {
    id: 'macos',
    name: 'macOS (Zsh)',
    shortName: 'macOS',
    icon: '🍎',
    shellName: 'zsh',
    promptTemplate: (path) => `estudiante@MacBook-Pro ${path.split('/').pop() || '~'} %`,
    color: 'purple',
    commands: {
      pwd: 'pwd',
      ls: 'ls',
      cd: 'cd',
      mkdir: 'mkdir',
      touch: 'touch',
      cat: 'cat',
      mv: 'mv',
      cp: 'cp',
      rm: 'rm',
      help: 'help',
      clear: 'clear'
    }
  }
];
