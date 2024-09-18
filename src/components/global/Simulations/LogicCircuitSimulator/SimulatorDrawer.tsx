import React from "react";
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";
import {
  LogicGateAnd,
  LogicGateOr,
  LogicGateNot,
  LogicGateNand,
  LogicGateNor,
  LogicGateXor,
  LogicGateXnor,
  LightBulbOff,
} from "@src/assets/icons";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  addNode: (nodeType: string, gateType?: string) => void;
}

const SimulatorDrawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  addNode,
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 w-64 md:rounded-l-10 dark:bg-backgroundDark z-[9] bg-gray-300 p-4 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full z-0"
        } md:translate-x-0 md:relative md:flex md:flex-col`}
      >
        <aside className="md:w-[240px] p-4 dark:bg-backgroundDark bg-gray-300 max-h-full overflow-y-auto">
          <Typography variant="h4" className="mb-2">
            Elements
          </Typography>
          <Typography variant="caption" className="mb-2">
            Click on the buttons to add elements to the canvas to create your
            customized logic circuit.
          </Typography>
          <ul>
            <li className="mb-2">
              <Button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center"
                onClick={() => addNode("inputNode")}
              >
                <Typography variant="body2" className="text-white">
                  Add Input
                </Typography>
              </Button>
            </li>
            <li className="mb-2">
              <Button
                className="w-full bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center justify-center"
                onClick={() => addNode("gateNode", "and")}
              >
                <LogicGateAnd className="mr-2 w-6 h-6" />
                <Typography variant="body2" className="text-white">
                  Add AND Gate
                </Typography>
              </Button>
            </li>
            <li className="mb-2">
              <Button
                className="w-full bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded flex items-center justify-center"
                onClick={() => addNode("gateNode", "or")}
              >
                <LogicGateOr className="mr-2 w-6 h-6" />
                <Typography variant="body2" className="text-white">
                  Add OR Gate
                </Typography>
              </Button>
            </li>
            <li className="mb-2">
              <Button
                className="w-full bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded flex items-center justify-center"
                onClick={() => addNode("gateNode", "not")}
              >
                <LogicGateNot className="mr-2 w-6 h-6" />
                <Typography variant="body2" className="text-white">
                  Add NOT Gate
                </Typography>
              </Button>
            </li>
            <li className="mb-2">
              <Button
                className="w-full bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center justify-center"
                onClick={() => addNode("gateNode", "nand")}
              >
                <LogicGateNand className="mr-2 w-6 h-6" />
                <Typography variant="body2" className="text-white">
                  Add NAND Gate
                </Typography>
              </Button>
            </li>
            <li className="mb-2">
              <Button
                className="w-full bg-pink-500 hover:bg-pink-700 text-white py-2 px-4 rounded flex items-center justify-center"
                onClick={() => addNode("gateNode", "nor")}
              >
                <LogicGateNor className="mr-2 w-6 h-6" />
                <Typography variant="body2" className="text-white">
                  Add NOR Gate
                </Typography>
              </Button>
            </li>
            <li className="mb-2">
              <Button
                className="w-full bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded flex items-center justify-center"
                onClick={() => addNode("gateNode", "xor")}
              >
                <LogicGateXor className="mr-2 w-6 h-6" />
                <Typography variant="body2" className="text-white">
                  Add XOR Gate
                </Typography>
              </Button>
            </li>
            <li className="mb-2">
              <Button
                className="w-full bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded flex items-center justify-center"
                onClick={() => addNode("gateNode", "xnor")}
              >
                <LogicGateXnor className="mr-2 w-6 h-6" />
                <Typography variant="body2" className="text-white">
                  Add XNOR Gate
                </Typography>
              </Button>
            </li>
            <li className="mb-2">
              <Button
                variant="contained"
                className="w-full text-white py-2 px-4 rounded flex items-center justify-center"
                onClick={() => addNode("outputNode")}
              >
                <LightBulbOff className="mr-2 w-6 h-6" />
                <Typography variant="body2" className="text-white">
                  Add Output (Lamp)
                </Typography>
              </Button>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
};

export default SimulatorDrawer;
