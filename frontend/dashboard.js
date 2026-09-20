const tableBody = document.getElementById("subscriberTableBody");

const subscriberCount =
  document.getElementById("subscriberCount");

const loading =
  document.getElementById("loading");

const errorMessage =
  document.getElementById("errorMessage");

const refreshBtn =
  document.getElementById("refreshBtn");

const logoutBtn =
  document.getElementById("logoutBtn");

const searchInput =
  document.getElementById("searchInput");


// =========================
// STATS
// =========================

const totalStat =
  document.getElementById("totalStat");

const journalistStat =
  document.getElementById("journalistStat");

const producerStat =
  document.getElementById("producerStat");

const promoterStat =
  document.getElementById("promoterStat");

const arStat =
  document.getElementById("arStat");

const cultureStat =
  document.getElementById("cultureStat");


// =========================
// AUTHENTICATION
// =========================

const token =
  localStorage.getItem("adminToken");

if (!token) {
  window.location.href = "./admin.html";
}


let subscribers = [];


// =========================
// UPDATE STATISTICS
// =========================

const updateStats = (list) => {

  totalStat.textContent = list.length;


  journalistStat.textContent =
    list.filter(
      (subscriber) =>
        subscriber.role === "Music Journalist"
    ).length;


  producerStat.textContent =
    list.filter(
      (subscriber) =>
        subscriber.role === "Producer"
    ).length;


  promoterStat.textContent =
    list.filter(
      (subscriber) =>
        subscriber.role === "Event Promoter"
    ).length;


  arStat.textContent =
    list.filter(
      (subscriber) =>
        subscriber.role === "Label A&R"
    ).length;


  cultureStat.textContent =
    list.filter(
      (subscriber) =>
        subscriber.role ===
        "Just here for the culture"
    ).length;

};


// =========================
// DISPLAY SUBSCRIBERS
// =========================

const displaySubscribers = (list) => {

  tableBody.innerHTML = "";


  if (list.length === 0) {

    tableBody.innerHTML = `
      <tr>

        <td
          colspan="5"
          style="
            text-align:center;
            color:#777;
          "
        >

          No subscribers found.

        </td>

      </tr>
    `;

    return;
  }


  list.forEach(
    (subscriber, index) => {

      const row =
        document.createElement("tr");


      const date =
        new Date(
          subscriber.createdAt
        );


      const formattedDate =
        date.toLocaleDateString(
          "en-NG",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        );


      row.innerHTML = `

        <td>
          ${index + 1}
        </td>

        <td>
          ${subscriber.username}
        </td>

        <td>
          ${subscriber.email}
        </td>

        <td>
          ${subscriber.role}
        </td>

        <td>
          ${formattedDate}
        </td>

      `;


      tableBody.appendChild(row);

    }
  );

};


// =========================
// LOAD SUBSCRIBERS
// =========================

const loadSubscribers = async () => {

  loading.style.display =
    "block";


  errorMessage.style.display =
    "none";


  tableBody.innerHTML =
    "";


  try {

    const response =
      await fetch(
        `${API_URL}/api/subscribers`,
        {
          method: "GET",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


    const data =
      await response.json();


    // =========================
    // INVALID / EXPIRED TOKEN
    // =========================

    if (response.status === 401) {

      localStorage.removeItem(
        "adminToken"
      );

      window.location.href =
        "./admin.html";

      return;
    }


    if (!response.ok) {

      throw new Error(
        data.message ||
        "Unable to load subscribers."
      );

    }


    // =========================
    // SAVE SUBSCRIBERS
    // =========================

    subscribers =
      data.subscribers;


    // =========================
    // UPDATE COUNTS
    // =========================

    subscriberCount.textContent =
      data.count;


    updateStats(
      subscribers
    );


    // =========================
    // HIDE LOADING
    // =========================

    loading.style.display =
      "none";


    // =========================
    // DISPLAY DATA
    // =========================

    displaySubscribers(
      subscribers
    );


  } catch (error) {

    console.error(
      "Dashboard error:",
      error
    );


    loading.style.display =
      "none";


    errorMessage.textContent =
      error.message ||
      "Unable to connect to the server.";


    errorMessage.style.display =
      "block";

  }

};


// =========================
// SEARCH SUBSCRIBERS
// =========================

searchInput.addEventListener(
  "input",
  () => {

    const searchTerm =
      searchInput.value
        .trim()
        .toLowerCase();


    const filteredSubscribers =
      subscribers.filter(
        (subscriber) => {

          return (

            subscriber.username
              .toLowerCase()
              .includes(searchTerm)

            ||

            subscriber.email
              .toLowerCase()
              .includes(searchTerm)

            ||

            subscriber.role
              .toLowerCase()
              .includes(searchTerm)

          );

        }
      );


    displaySubscribers(
      filteredSubscribers
    );

  }
);


// =========================
// REFRESH
// =========================

refreshBtn.addEventListener(
  "click",
  loadSubscribers
);


// =========================
// LOGOUT
// =========================

logoutBtn.addEventListener(
  "click",
  () => {

    localStorage.removeItem(
      "adminToken"
    );

    window.location.href =
      "./admin.html";

  }
);


// ==================================================
// ARTIST SUBMISSIONS
// ==================================================

const artistTableBody =
  document.getElementById(
    "artistTableBody"
  );


const artistLoading =
  document.getElementById(
    "artistLoading"
  );


const artistErrorMessage =
  document.getElementById(
    "artistErrorMessage"
  );


const artistSearchInput =
  document.getElementById(
    "artistSearchInput"
  );


const refreshArtistsBtn =
  document.getElementById(
    "refreshArtistsBtn"
  );


let artistSubmissions = [];


// ==================================================
// UPDATE ARTIST STATUS
// ==================================================

const updateArtistStatus = async (
  artistId,
  newStatus,
  selectElement
) => {

  // Disable dropdown while saving

  selectElement.disabled = true;


  try {

    const response =
      await fetch(
        `${API_URL}/api/artists/${artistId}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );


    const data =
      await response.json();


    // =========================
    // INVALID TOKEN
    // =========================

    if (response.status === 401) {

      localStorage.removeItem(
        "adminToken"
      );

      window.location.href =
        "./admin.html";

      return;
    }


    if (!response.ok) {

      throw new Error(
        data.message ||
        "Unable to update artist status."
      );

    }


    // =========================
    // UPDATE LOCAL DATA
    // =========================

    const artist =
      artistSubmissions.find(
        (item) =>
          item._id === artistId
      );


    if (artist) {

      artist.status =
        newStatus;

    }


    // =========================
    // SUCCESS FEEDBACK
    // =========================

    selectElement.style.borderColor =
      "#c8f135";


    setTimeout(() => {

      selectElement.style.borderColor =
        "";

    }, 1000);


    console.log(
      "Artist status updated:",
      data.message
    );


  } catch (error) {

    console.error(
      "Status update error:",
      error
    );


    alert(
      error.message ||
      "Unable to update artist status."
    );


    // Restore previous value

    const artist =
      artistSubmissions.find(
        (item) =>
          item._id === artistId
      );


    if (artist) {

      selectElement.value =
        artist.status || "New";

    }


  } finally {

    selectElement.disabled =
      false;

  }

};


// =========================
// DISPLAY ARTISTS
// =========================

const displayArtistSubmissions =
  (list) => {

    artistTableBody.innerHTML =
      "";


    if (list.length === 0) {

      artistTableBody.innerHTML = `

        <tr>

          <td
            colspan="8"
            style="
              text-align:center;
              color:#777;
            "
          >

            No artist submissions found.

          </td>

        </tr>

      `;

      return;
    }


    list.forEach(
      (artist, index) => {

        const row =
          document.createElement("tr");


        const date =
          new Date(
            artist.createdAt
          );


        const formattedDate =
          date.toLocaleDateString(
            "en-NG",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          );


        const currentStatus =
          artist.status || "New";


        row.innerHTML = `

          <td>
            ${index + 1}
          </td>


          <td>
            ${artist.artistName}
          </td>


          <td>
            ${artist.genre}
          </td>


          <td>
            ${artist.location}
          </td>


          <td>

            <a
              href="${artist.musicLink}"
              target="_blank"
              rel="noopener noreferrer"
              style="
                color:#c8f135;
                text-decoration:none;
                font-weight:bold;
              "
            >

              LISTEN ↗

            </a>

          </td>


          <td>
            ${artist.email}
          </td>


          <td>

            <select
              class="artist-status"
              data-artist-id="${artist._id}"
            >

              <option
                value="New"
                ${
                  currentStatus === "New"
                    ? "selected"
                    : ""
                }
              >
                New
              </option>


              <option
                value="Listened"
                ${
                  currentStatus === "Listened"
                    ? "selected"
                    : ""
                }
              >
                Listened
              </option>


              <option
                value="Featured"
                ${
                  currentStatus === "Featured"
                    ? "selected"
                    : ""
                }
              >
                Featured
              </option>


              <option
                value="Declined"
                ${
                  currentStatus === "Declined"
                    ? "selected"
                    : ""
                }
              >
                Declined
              </option>

            </select>

          </td>


          <td>
            ${formattedDate}
          </td>

        `;


        artistTableBody.appendChild(
          row
        );


        // =========================
        // STATUS CHANGE EVENT
        // =========================

        const statusSelect =
          row.querySelector(
            ".artist-status"
          );


        statusSelect.addEventListener(
          "change",
          () => {

            updateArtistStatus(
              artist._id,
              statusSelect.value,
              statusSelect
            );

          }
        );

      }
    );

  };


// =========================
// LOAD ARTIST SUBMISSIONS
// =========================

const loadArtistSubmissions =
  async () => {

    artistLoading.style.display =
      "block";


    artistErrorMessage.style.display =
      "none";


    artistTableBody.innerHTML =
      "";


    try {

      const response =
        await fetch(
          `${API_URL}/api/artists`,
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );


      const data =
        await response.json();


      // =========================
      // INVALID TOKEN
      // =========================

      if (response.status === 401) {

        localStorage.removeItem(
          "adminToken"
        );

        window.location.href =
          "./admin.html";

        return;
      }


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Unable to load artist submissions."
        );

      }


      artistSubmissions =
        data.submissions || [];


      artistLoading.style.display =
        "none";


      displayArtistSubmissions(
        artistSubmissions
      );


    } catch (error) {

      console.error(
        "Artist dashboard error:",
        error
      );


      artistLoading.style.display =
        "none";


      artistErrorMessage.textContent =
        error.message ||
        "Unable to connect to the server.";


      artistErrorMessage.style.display =
        "block";

    }

  };


// =========================
// SEARCH ARTISTS
// =========================

artistSearchInput.addEventListener(
  "input",
  () => {

    const searchTerm =
      artistSearchInput.value
        .trim()
        .toLowerCase();


    const filteredArtists =
      artistSubmissions.filter(
        (artist) => {

          return (

            artist.artistName
              .toLowerCase()
              .includes(searchTerm)

            ||

            artist.genre
              .toLowerCase()
              .includes(searchTerm)

            ||

            artist.location
              .toLowerCase()
              .includes(searchTerm)

            ||

            artist.email
              .toLowerCase()
              .includes(searchTerm)

            ||

            (artist.status || "New")
              .toLowerCase()
              .includes(searchTerm)

          );

        }
      );


    displayArtistSubmissions(
      filteredArtists
    );

  }
);


// =========================
// REFRESH ARTISTS
// =========================

refreshArtistsBtn.addEventListener(
  "click",
  loadArtistSubmissions
);


// =========================
// INITIAL LOAD
// =========================

loadSubscribers();

loadArtistSubmissions();