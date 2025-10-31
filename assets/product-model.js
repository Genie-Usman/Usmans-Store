class ProductModel extends HTMLElement {
    constructor() {
        super();
        this.addEventListener('click', this.loadContent);
    }

    connectedCallback() {
        this.setupModalHandler();
        
    }

    getMediaID() {
        return this.getAttribute('data-media-id');
    }

    getModal() {
        return document.getElementById("productModelModal");
    }

    loadContent(){
        Shopify.loadFeatures(
            [
                {
                    name: "model-viewer-ui",
                    version: "1.0",
                    onLoad: this.setupModelViewerUI.bind(this)
                }
            ]
        )
    }

    setupModelViewerUI(errors){
        if(errors) return;
        this.modelViewerUI = new Shopify.ModelViewerUI(document.querySelector('model-viewer')) 
    }

    setupModalHandler() {
        const mediaID = this.getMediaID();
        const modal = this.getModal();

        if (!mediaID || !modal) return;

        const openModalButton = this.querySelector(`#productModelOpenButton_${mediaID}`);
        if (!openModalButton) return;

        openModalButton.addEventListener('click', () => {
            const modalBody = modal.querySelector('#body');
            const template = this.querySelector('template');

            if (modalBody && template) {
                modalBody.innerHTML = '';
                modalBody.appendChild(template.content.cloneNode(true));
                modal.classList.add('active'); 
            }
        });
    }
}

customElements.define('product-model', ProductModel);
