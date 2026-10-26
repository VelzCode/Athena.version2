const searchInput = document.querySelector(".search-input");
const searchableItems = document.querySelectorAll(".searchable");
const searchResults = document.querySelector(".search-results");
const searchForm = document.querySelector(".search-wrapper");

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();
        
    if (searchTerm === "") {
        return;
    }

    const matches = [];

    searchableItems.forEach((item) => {
        const itemText = item.textContent.trim().toLowerCase();
        const words = itemText.split(/\s+/);
        const isMultiWord = searchTerm.includes(" ");

        let isMatch;

        if (isMultiWord) {
            isMatch = itemText.includes(searchTerm);
        } else {
            isMatch = words.some((word) => {
                return word.replace(/^\W+|\W+$/g, "") === searchTerm;
            });
        }
 
        if (isMatch) {
            matches.push(item);
        }
    });

    const matchTotal = matches.length;

    if (matchTotal === 0) {
        searchResults.textContent = "No results found, please try again";
        return;
    }

    searchResults.innerHTML = "";
    matches.forEach((match) => {
        const resultItem = document.createElement("button");
        resultItem.classList.add("search-result");
        resultItem.textContent = match.textContent.trim();
        resultItem.addEventListener("click", () => {
            const panel = match.closest(".pscontent-wrapper");
            if (panel) {          
                const tabName = panel.dataset.tab;
                const tabButton = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
                    tabButton.click();
            }
            match.classList.add("highlight");
            setTimeout(() => {
                match.classList.remove("highlight");
            }, 2000);
            match.scrollIntoView();
        });
        searchResults.appendChild(resultItem);
    });
});