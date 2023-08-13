export function openModal(msg) {
    if (typeof window !== "undefined") {
        var backdrop = document.querySelector(".backdrop");
        var modal = document.querySelector(".modal");
        var modalTitle = document.querySelector(".modal__title");
        backdrop.style.display = "block";
        modal.style.display = "block";
        modalTitle.innerHTML = msg;
        

        var modalContinueBtn = document.querySelector(".modal__action--continue");
        modalContinueBtn.addEventListener('click', closeModal);
    }
}

function closeModal() {
    if (typeof window !== "undefined") {
        var backdrop = document.querySelector(".backdrop");
        var modal = document.querySelector(".modal");
        backdrop.style.display = "none";
        modal.style.display = "none";
    }
}
