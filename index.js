function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }

      // Event listener to display the UUID in the textarea
      document.getElementById("generateButton").addEventListener("click", function() {
        const uuid = generateUUID();
        document.getElementById("uuid").value = uuid;
      });
