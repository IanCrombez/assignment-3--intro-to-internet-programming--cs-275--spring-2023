let root = document.querySelector(`:root`);
//get the buttion and pannle info
let bMenu = document.querySelectorAll(`#js-triggers > li:first-child > a`)[0];
let bModal = document.querySelectorAll(`#js-triggers > li:last-child > a`)[0];
let modalPanel = document.getElementsByClassName(`modal-panel`)[0];
//get viewport infor for changing dinamicly
let viewportWidth = window.innerWidth;
let breakpoint = `736`;

//when the page starts preset everything
window.onload = () => {
    if(viewportWidth > breakpoint)
    {
        root.style.setProperty(`--menu-top`, `0`);
        root.style.setProperty(`--menu-left`, `inherit`);
        root.style.setProperty(`--menu-style`, `inline-block`);
        root.style.setProperty(`--menu-position`, `center`);
    }
    else
    {
        root.style.setProperty(`--menu-top`, `80px`);
        root.style.setProperty(`--menu-left`, `-130px`);
        root.style.setProperty(`--menu-style`, `block`);
        root.style.setProperty(`--menu-position`, `left`);
    }
};

//real time resize things
window.onresize  = () => {
    viewportWidth = window.innerWidth;
    if(viewportWidth <= breakpoint &&  window.innerWidth > breakpoint)
    {
        root.style.setProperty(`--transition-duration`, `0ms`);
        root.style.setProperty(`--menu-top`, `0`);
        setTimeout(() => {
            root.style.setProperty(`--transition-duration`, `500ms`);
        }, 20);

    }
    else if(window.innerWidth > breakpoint)
    {
        root.style.setProperty(`--menu-top`, `0`);
        root.style.setProperty(`--menu-left`, `inherit`);
        root.style.setProperty(`--menu-style`, `inline-block`);
        root.style.setProperty(`--menu-position`, `center`);

    }
    else
    {
        root.style.setProperty(`--menu-top`, `80px`);
        root.style.setProperty(`--menu-left`, `-130px`);
        root.style.setProperty(`--menu-style`, `block`);
        root.style.setProperty(`--menu-position`, `left`);
    }
};
//button for the menu and the actovation and deactivation
bMenu.addEventListener(`click`, () => {
    if(window.innerWidth > `736`)
    {
        if(root.style.getPropertyValue(`--menu-top`) !== `0`)
        {
            root.style.setProperty(`--menu-top`, `0`);

        }
        else
        {
            root.style.setProperty(`--menu-top`, `80px`);
        }

    }
    else
    {
        if(root.style.getPropertyValue(`--menu-left`) !== `0`)
        {
            root.style.setProperty(`--menu-left`, `0`);
        }
        else
        {
            root.style.setProperty(`--menu-left`, `-130px`);
        }
    }
});
//open close modal
bModal.addEventListener(`click`, () => {
    modalPanel.style.display = `inline`;
    //make the keybard close the modal
    document.addEventListener(`keydown`, (k) => {
        //K IS FOR KEYBOARD STOP CHINGING IT SLEEPY IAN, THIS WORKS DONT CHANGE
        if(k.code === `Escape`)
        {
            modalPanel.style.display = `none`;
        }

    });

    let modalContentPane = modalPanel.getElementsByClassName(`modal-content-pane`)[0];
    modalContentPane.addEventListener(`click`, (event) => { //stops bubbling of event
        event.stopPropagation();

    });
    //make the mouse close the modal
    modalPanel.addEventListener(`click`, (event) => {
        event.stopPropagation();
        modalPanel.style.display = `none`;
    });
});
