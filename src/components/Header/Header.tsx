import {
  BsArrowRepeat,
  BsClockHistory,
  BsDownload,
  BsGear,
  BsGraphUp,
  BsNewspaper,
} from "react-icons/bs";
import { usePopupStore } from "../../stores/PopupStore";

type HeaderProps = {
  onRestart: () => void;
};

function Header({ onRestart }: HeaderProps) {
  const openPopup = usePopupStore((state) => state.open);

  const handleMenuClick = (callback?: () => void) => {
    if (callback) {
      callback();
    }
    // DaisyUI dropdowns close when they lose focus.
    // When an item is clicked, we programmatically blur the active element
    // to trigger the dropdown to close.
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <>
      <header className="bg-base-100 shadow-sm">
        <div className="flex justify-between px-4 py-1.5 text-sm items-center w-full">
          <ul className="flex gap-4">
            <li className="dropdown dropdown-start">
              <button className="cursor-pointer hover:text-primary">
                <span tabIndex={0} role="button" className="underline">
                  J
                </span>
                eu
              </button>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <button
                    className="hover:text-primary"
                    onClick={() => handleMenuClick(() => openPopup("new"))}
                  >
                    <BsNewspaper className="mr-2" />
                    Nouvelle Partie
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-primary"
                    onClick={() => handleMenuClick(onRestart)}
                  >
                    <BsArrowRepeat className="mr-2" />
                    Restarter
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-primary"
                    onClick={() => handleMenuClick()}
                  >
                    <BsDownload className="mr-2" />
                    Enregistrer
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-primary"
                    onClick={() => handleMenuClick()}
                  >
                    <BsClockHistory className="mr-2" />
                    Reprendre une Partie
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-primary"
                    onClick={() => handleMenuClick()}
                  >
                    <BsGraphUp className="mr-2" />
                    Statistiques
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-primary"
                    onClick={() => handleMenuClick()}
                  >
                    <BsGear className="mr-2" />
                    Paramètres
                  </button>
                </li>
              </ul>
            </li>
            <li className="cursor-pointer hover:text-primary">
              <span className="underline">D</span>istribuer
            </li>
            <li className="cursor-pointer hover:text-primary">
              <span className="underline">?</span>
            </li>
          </ul>

          <div className="flex">
            <button>Connetion</button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
