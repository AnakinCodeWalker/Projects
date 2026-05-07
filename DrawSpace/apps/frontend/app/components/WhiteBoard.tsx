"use client"

import { Excalidraw} from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

export default function WhiteBoard() {
  return (
    <div style={{ height: "100vh" }}>
      <Excalidraw >
        {/* <Sidebar name=""></Sidebar>  */}
      </Excalidraw>
    </div>
  );
}