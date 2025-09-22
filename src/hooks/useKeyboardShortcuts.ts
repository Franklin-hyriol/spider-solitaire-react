
import { useEffect } from 'react';
import { useColumnsStore } from '../stores/ColumnStore';
import { useGameStatsStore } from '../stores/GameStatsStore';
import { usePopupStore } from '../stores/PopupStore';
import { useUndoStore } from '../stores/UndoStore';

export const useKeyboardShortcuts = () => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ne pas déclencher de raccourcis si un popup est ouvert, sauf pour la touche Échap
      const isPopupOpen = usePopupStore.getState().type !== null;
      if (event.key !== 'Escape' && isPopupOpen) {
        return;
      }

      // Gérer le Ctrl+Z pour Annuler
      if (event.ctrlKey && event.key.toLowerCase() === 'z') {
        event.preventDefault();
        useUndoStore.getState().undo();
        return;
      }

      // Ignorer les raccourcis si une touche de modification est enfoncée (sauf pour Ctrl+Z déjà géré)
      if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'n':
          usePopupStore.getState().open('new');
          break;

        case 'r':
          usePopupStore.getState().open('confirmRestart');
          break;

        case 'h':
          useGameStatsStore.getState().showHint();
          break;

        case ' ': // Espace
          event.preventDefault();
          useColumnsStore.getState().dealFromStock();
          break;

        case 'p': {
          const { isRunning, pause, resume } = useGameStatsStore.getState();
          const { open, close, type } = usePopupStore.getState();
          if (isRunning) {
            pause();
            open('pause');
          } else if (type === 'pause') {
            resume();
            close();
          }
          break;
        }
        
        case 'escape':
          break;

        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
};
