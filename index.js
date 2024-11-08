<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>UUID Generator</title>
    <style>
      /* Default subdued style */
      #namespaceInput {
        opacity: 0.5;
        transition: opacity 0.3s ease, border-color 0.3s ease;
      }

      /* Prominent style for the namespace input */
      .highlight {
        opacity: 1;
        border: 2px solid #8d0000;
      }
    </style>
  </head>
  <body>
    <h1>UUID GENERATOR</h1>
    <div>
      <label for="Versions">Versions:</label>
      <button onclick="setVersion('nil')">NIL</button>
      <button onclick="setVersion('v1')">V1</button>
      <button onclick="setVersion('v3')">V3</button>
      <button onclick="setVersion('v4')">V4</button>
      <button onclick="setVersion('v5')">V5</button>
      <br /><br />
      <label for="namespaceInput">Namespace (for v3/v5):</label>
      <input
        type="text"
        id="namespaceInput"
        placeholder="Enter namespace for v3/v5"
      />
      <br /><br />
      <label for="quantityInput">Quantity:</label>
      <input type="number" id="quantityInput" min="1" value="1" />
      <br /><br />
      <button id="generateButton">Generate UUIDs</button>
      <br /><br />
      <textarea id="uuid" rows="5" cols="40" readonly></textarea>
      <br />
      <button id="copyButton">Copy</button>
    </div>

    <script type="module">
      import {
        v1,
        v3,
        v4,
        v5,
      } from "https://cdn.jsdelivr.net/npm/uuid@latest/dist/esm-browser/index.js";

      let selectedVersion = "v4"; // Default version

      // Function to set selected version and apply highlight
      window.setVersion = function (version) {
        selectedVersion = version;
        const namespaceInput = document.getElementById("namespaceInput");

        // Toggle highlight based on the selected version
        if (version === "v3" || version === "v5") {
          namespaceInput.classList.add("highlight");
        } else {
          namespaceInput.classList.remove("highlight");
        }
      };

      // Function to generate the UUIDs based on selected version and quantity
      function generateUUIDs() {
        const quantity =
          parseInt(document.getElementById("quantityInput").value) || 1;
        const namespace =
          document.getElementById("namespaceInput").value || "example.com";
        let uuids = [];

        for (let i = 0; i < quantity; i++) {
          let uuid;
          switch (selectedVersion) {
            case "nil":
              uuid = "00000000-0000-0000-0000-000000000000";
              break;
            case "v1":
              uuid = v1();
              break;
            case "v3":
              uuid = v3(namespace + i, v3.DNS); // Adding `i` to make each UUID unique
              break;
            case "v4":
              uuid = v4();
              break;
            case "v5":
              uuid = v5(namespace + i, v5.DNS); // Adding `i` to make each UUID unique
              break;
            default:
              uuid = "Unknown version";
          }
          uuids.push(uuid);
        }
        return uuids;
      }

      // Event listener to display the UUIDs in the textarea
      document
        .getElementById("generateButton")
        .addEventListener("click", function () {
          const uuids = generateUUIDs();
          document.getElementById("uuid").value = uuids.join("\n");
        });

      // Copy to Clipboard Functionality
      document
        .getElementById("copyButton")
        .addEventListener("click", function () {
          const textarea = document.getElementById("uuid");
          textarea.select();
          textarea.setSelectionRange(0, 99999); // For mobile devices

          // Copy the text to clipboard
          navigator.clipboard.writeText(textarea.value);
        });
    </script>
  </body>
</html>
