const allPlayers = (playerName) => {
  fetch(
    `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.player);
      displayPlayers(data);
    });
};

allPlayers("jo");

const displayPlayers = (data) => {
  const playersContainer = document.getElementById("players-container");
  playersContainer.innerHTML = "";

  if (data.player) {
    data.player.forEach((player) => {
      const playerDiv = document.createElement("div");
      playerDiv.classList.add("col");
      playerDiv.innerHTML = `
              <div class="card bg-dark border border-white">
                  <img src="${player.strThumb}" class="card-img-top alt="${player.strPlayer}" >
                  <div class="card-body">   
                      <div class="d-flex justify-content-between align-items-center mb-1">
                          <div>
                              <h3 class=" text-info">${player.strPlayer}</h3>
                          </div>
                          <div>
                              <a href=${player.strFacebook}  target="_blank" class="text-info m-1"><i class="fa-brands fa-facebook"></i></a>
                              <a href=${player.strInstagram} target="_blank" class="text-info m-1"><i class="fa-brands fa-instagram"></i></a>
                              <a href=${player.strTwitter}  target="_blank" class="text-info m-1"><i class="fa-brands fa-twitter"></i></a>
                          </div>
                      </div>

                      <h6 class="text-white ">Team: ${player.strTeam}</h6>
                      <p class="text-white m-0" >Nationality: ${player.strNationality}</p>
                      <p class="text-white m-0">Sports: ${player.strSport} </p>
                      <p class="text-white m-0">Player Number: ${player.strNumber} </p>
                      <p class="text-white m-0">Position: ${player.strPosition} </p>
                      <p class="text-white m-0">Height: ${player.strHeight} </p>
                      <p class="text-white m-0">Weight: ${player.strWeight} </p>                  
                      <p class="text-white m-0">Team ID: ${player.intSoccerXMLTeamID} </p>                  
                      <p class="text-white m-0">Kit: ${player.strKit} </p>                  
                      <p class="text-white m-0">Player Status: ${player.strStatus} </p>
                      
                      
                  </div>
                  <div class="card-footer d-flex align-items-center justify-content-between">
                      <button  onclick="singlePlayer('${player.idPlayer}')"  class="btn btn-info " data-bs-toggle="modal" data-bs-target="#exampleModal"> Details </button>
                      <button id="add-player-button-${player.idPlayer}" onclick="addSinglePlayer('${player.idPlayer}')"  class="btn btn-success " > Add to group </button>
                  </div>
              </div>
             
          `;
      playersContainer.appendChild(playerDiv);
    });
  } else {
    playersContainer.innerHTML = `<h4 class="text-danger">Player not found!</h4> `;
  }
};

const handleSearch = (event) => {
  event.preventDefault();
  const playerName = document.getElementById("searchInput").value;
  if (playerName) {
    allPlayers(playerName);
  } else {
    document.getElementById("players-container").innerHTML = "";
  }
  document.getElementById("searchInput").value = "";
};

document.getElementById("searchForm").addEventListener("submit", handleSearch);

document
  .getElementById("searchInput")
  .addEventListener("input", function (event) {
    const playerName = event.target.value;
    if (playerName) {
      allPlayers(playerName);
    } else {
      document.getElementById("players-container").innerHTML = "";
    }
  });

const singlePlayer = (id) => {
  fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      viewSinglePlayer(data.players[0]);
    });
};

const viewSinglePlayer = (player) => {
  const title = document.getElementById("single-player-title");
  const body = document.getElementById("single-player-body");
  console.log(player.strPlayer);
  title.innerText = player.strPlayer;

  body.innerHTML = `
  <div class="card ">
      <div class="row bg-dark g-0">
          <div class="col-md-4 d-flex justify-content-center align-items-center">
              <img src=${
                player.strThumb
              } class="img-fluid rounded-start" alt="">
          </div>
          
          <div class="col-md-8">
              <div class="card-body">
                  <p class="card-title text-danger">Place of Birth: ${
                    player.strBirthLocation
                  } </p>
                  <p class="card-title text-danger">Date of Birth: ${
                    player.dateBorn
                  } </p>
                  <p class="card-title text-danger">Nationality: ${
                    player.strNationality
                  } </p>
                  <p class="card-title text-danger">Play: ${
                    player.strSport
                  } </p>
                  <p class="card-title text-danger">Position: ${
                    player.strPosition
                  } </p>
                  <p class=" card-title text-white">Description: ${player.strDescriptionEN.slice(
                    0,
                    10
                  )}</p>
                  <p class="text-white"><small class="text-white">Gender: ${
                    player.strGender
                  } </small></p>
              </div>
          </div>
      </div>
  </div>
  `;
};

const addSinglePlayer = (id) => {
  fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      handleAddToTeam(data.players[0]);
    });
};

let addedPlayers = [];
document.getElementById("added-players-qunatity").innerText = 0;

const handleAddToTeam = (player) => {
  if (addedPlayers.length < 11) {
    if (addedPlayers.some((p) => p.idPlayer == player.idPlayer)) {
      alert("Already added");
    } else {
      addedPlayers.push(player);
      document.getElementById(
        `add-player-button-${player.idPlayer}`
      ).disabled = true;
      document.getElementById(
        `add-player-button-${player.idPlayer}`
      ).innerText = "Already Added";
      viewAddedPlayers();
    }
  } else {
    alert("You cannot select more than 11 players!");
  }
};

const viewAddedPlayers = () => {
  document.getElementById("added-players-qunatity").innerText =
    addedPlayers.length;

  const addedPlayersContainer = document.getElementById(
    "added-players-container"
  );
  addedPlayersContainer.innerHTML = "";

  if (addedPlayers) {
    addedPlayers.forEach((player) => {
      const playerDiv = document.createElement("div");
      playerDiv.classList.add("col");

      document
        .getElementById("added-players-container")
        .classList.add("border", "border-warning");

      playerDiv.innerHTML = `
              <div class="card bg-dark border border-white">
                  <div class="card-body">
                      
                      <div class="d-flex justify-content-between align-items-center">
                          <div>
                              <h3 class=" text-info">${player.strPlayer}</h3>
                          </div>
                          <div class="card-footer align-items-center">
                            <button  onclick="singlePlayer('${player.idPlayer}')"  class="btn btn-info " data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                            <button  onclick="removeFormTeam('${player.idPlayer}')"  class="btn btn-danger " >Remove</button>
                          </div>
                      </div>
                  </div>
                  
              </div>
             
          `;
      addedPlayersContainer.appendChild(playerDiv);
    });
  } else {
    addedPlayersContainer.innerHTML = `<h4 class="text-danger ">Player not found!</h4> `;
  }
};

const removeFormTeam = (playerID) => {
  document.getElementById(`add-player-button-${playerID}`).disabled = false;
  document.getElementById(`add-player-button-${playerID}`).innerText =
    "Add To Team";
  addedPlayers = addedPlayers.filter((player) => player.idPlayer != playerID);
  viewAddedPlayers();
};
