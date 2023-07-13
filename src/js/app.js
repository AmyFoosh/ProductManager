let app;

// Wait until DOM is fully loaded to create webpage behavior.
addEventListener("DOMContentLoaded", (e) => {

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

    // -- CREATE APP CONTROLLER FOR WEBPAGE --

    app = new Controller(new Model(), new View());

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

    // -- ADD LISTENERS --

    // Prevent some keyboard shorcuts.
    addEventListener("keydown", (e) => {

        // Prevent CTRL + S
        if (e.ctrlKey && e.key === "s") e.preventDefault();

        // Prevent CTRL + U
        if (e.ctrlKey && e.key === "u") e.preventDefault();

        // Prevent CTRL + P
        if (e.ctrlKey && e.key === "p") e.preventDefault();
    });

    // Prevent right click.
    addEventListener("contextmenu", (e) => {

        e.preventDefault();
    });

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
});