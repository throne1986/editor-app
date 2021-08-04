import React, { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import gjsBlockBasic from "grapesjs-blocks-basic";
import { useParams } from "react-router-dom";
import logo from "../assets/images/V_widget_maly_roz.png"
import $ from "jquery";
import "../styles/app.scss";
import {
  deviceManager,
  layerManager,
  panels,
  selectorManager,
  styleManager,
  traitManager,
} from "../utilis/grapesjs_utils";

import grapesjsWebpage from "grapesjs-preset-webpage"
import grapesjsForms from "grapesjs-plugin-forms";
import grapesjsNavbar  from "grapesjs-navbar";
import grapesjsTabs  from "grapesjs-tabs";
import grapesjsIframe  from "grapesjs-plugin-iframe";
import grapesjsSlider  from "grapesjs-lory-slider";

const Editor = () => {
  const [editor, setEditor] = useState(null);
  const [assets, setAssets] = useState([]);
  let { pageId } = useParams();


  useEffect(() => {
    $(".panel__devices").html("");
    $(".panel__editor").html("");
    $(".panel__basic-actions").html("");
    $("#styles-container").html("");
    const editor = grapesjs.init({
      container: "#editor",
      blockManager: {
        appendTo: "#blocks",
      },
      styleManager: styleManager,
      layerManager: layerManager,
      traitManager: traitManager,
      selectorManager: selectorManager,
      panels: panels,
      deviceManager: deviceManager,
      storageManager: {
        type: "remote",
        stepsBeforeSave: 3,
        contentTypeJson: true,
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
        headers: {
          "Content-Type": "application/json",
        },
        id: "mycustom-",
      },
      assetManager: {
        upload: false,
        assets: assets,
        storeOnChange: false,
        storeAfterUpload: false,
        },

      plugins: [gjsBlockBasic,grapesjsSlider, grapesjsForms, grapesjsNavbar, grapesjsTabs, grapesjsIframe],
        pluginsOpts: {
            grapesjsNavbar: {},
            gjsBlockBasic: {},
            grapesjsForms: {},
            grapesjsTabs: {},
            grapesjsIframe: {},
            grapesjsSlider: {}

      },
    });

    // Commands
    editor.Commands.add("set-device-desktop", {
      run: (editor) => editor.setDevice("Desktop"),
    });
    editor.Commands.add("set-device-mobile", {
      run: (editor) => editor.setDevice("Mobile"),
    });
    editor.Commands.add("set-device-tablet", {
      run: (editor) => editor.setDevice("Tablet"),
    });
    editor.Commands.add("save-db", {
      run: (editor, sender) => {
        sender && sender.set("active");
        editor.store();
      },
    });

    editor.Commands.add("cmd-clear", {
      run: (editor) => {
        editor.DomComponents.clear();
        editor.CssComposer.clear();
      },
    });
    editor.Commands.add("undo", {
      run: (editor) => {
        editor.UndoManager.undo();
      },
    });
    editor.Commands.add("redo", {
      run: (editor) => {
        editor.UndoManager.redo();
      },
    });

    setEditor(editor);
  }, [assets, pageId]);

  return (
    <>
      {" "}
      <div id="navbar" className="sidenav d-flex flex-column overflow-scroll">
        <nav className="navbar navbar-light">
          <div className="container-fluid left-container">
            <span className="navbar-brand mb-0 h3 logo">
                <img src={logo} />
            </span>
          </div>
        </nav>
        <div className="">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="block-tab"
                data-bs-toggle="tab"
                data-bs-target="#block"
                type="button"
                role="tab"
                aria-controls="block"
                aria-selected="true"
                onClick={() =>editor.runCommand('open-blocks')}
              >
                <i className="fa fa-cubes"></i>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="layer-tab"
                data-bs-toggle="tab"
                data-bs-target="#layer"
                type="button"
                role="tab"
                aria-controls="layer"
                aria-selected="false"
              >
                <i className="fa fa-tasks"></i>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="style-tab"
                data-bs-toggle="tab"
                data-bs-target="#style"
                type="button"
                role="tab"
                aria-controls="style"
                aria-selected="false"
                onClick={()=>editor.runCommand('open-sm')}
              >
                <i className="fa fa-paint-brush"></i>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="trait-tab"
                data-bs-toggle="tab"
                data-bs-target="#trait"
                type="button"
                role="tab"
                aria-controls="trait"
                aria-selected="false"
              >
                <i className="fa fa-cog"></i>
              </button>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="block"
              role="tabpanel"
              aria-labelledby="block-tab"
            >
              <div id="blocks"></div>
            </div>
            <div
              className="tab-pane fade"
              id="layer"
              role="tabpanel"
              aria-labelledby="layer-tab"
            >
              <div id="layers-container"></div>
            </div>
            <div
              className="tab-pane fade"
              id="style"
              role="tabpanel"
              aria-labelledby="style-tab"
            >
              <div id="styles-container"></div>
            </div>
            <div
              className="tab-pane fade"
              id="trait"
              role="tabpanel"
              aria-labelledby="trait-tab"
            >
              <div id="trait-container"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <nav className="navbar navbar-light">
            <div className="container-fluid panel-fluid" styles={{ height: "51px", padding: "0"}}>
            <div className="panel-container">
            <div className="panel__devices"></div>
            <div className="panel__editor"></div>
            </div>
            {/* <div className="panel__basic-actions"></div> */}
          </div>
        </nav>
        <div id="editor"></div>
      </div>
    </>
  );
};

export default Editor;