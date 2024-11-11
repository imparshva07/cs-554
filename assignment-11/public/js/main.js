/* 
All of the functionality will be done in this client-side JS file.  
You will make client - side AJAX requests to the API and use jQuery to target and create elements on the page. You can use a client-side fetch or axios request instead of AJAX)
*/

let pageNumber = 1;
$(document).ready(function() {
    $('#searchMovieForm').submit(function(event) {
        event.preventDefault();
        
        var input = $('#movie_search_term').val().trim();
        
        if (input.length === 0) {
            alert('Error : Please enter a movie name to continue');
            return;
        }
        
        $('#movieDetails').hide();
        $("#rootLink").hide();
        
        $('#searchResults').empty();
        
        let requestConfig = {
            method: 'GET',
            url: 'https://www.omdbapi.com/?apikey=CS546&s='+ input +'&page=1'
            };
            $.ajax(requestConfig).then(function (data) {

                if(data.Response && data.Response === 'False') {
                    if(data.Error && data.Error === 'Movie not found!') {
                    alert('Error : Movies Not Found');
                    }
                }
                if(data.Search && data.Search.length > 0) {
                    let movieList = data.Search;

                    movieList.forEach(function(movie) {
                        var listItem = $("<li>");
                        var link = $("<a>").text(movie.Title).attr("href", "javascript:void(0)").attr("data-id", movie.imdbID);
                        listItem.append(link);
                        $("#searchResults").append(listItem);
                    });
                    if(movieList.length === 10) {
                        let requestConfig = {
                            method: 'GET',
                            url: 'https://www.omdbapi.com/?apikey=CS546&s='+ input +'&page=1'
                            };
                            $.ajax(requestConfig).then(function (data) {
                
                                if(data.Response && data.Response === 'False') {
                                    if(data.Error && data.Error === 'Movie not found!') {
                                    alert('Error : Movies Not Found');
                                    }
                                }
                                if(data.Search && data.Search.length > 0) {
                                    let movieList = data.Search;
                
                                    movieList.forEach(function(movie) {
                                        var listItem = $("<li>");
                                        var link = $("<a>").text(movie.Title).attr("href", "javascript:void(0)").attr("data-id", movie.imdbID);
                                        listItem.append(link);
                                        $("#searchResults").append(listItem);
                                    });
                                    $("#searchResults").show();
                                    $("#rootLink").show();
                                }
                                });
                    } else {
                        $("#searchResults").show();
                        $("#rootLink").show();
                    }
                    $("#searchResults").show();
                    $("#rootLink").show();
                    }
        });
    });

    $(document).on('click', '#searchResults a', function(event) {
        event.preventDefault();

        $("#searchResults").hide();
        $("#rootLink").hide();

        $("#movieDetails").empty();
        var imdbID = $(this).data("id");

        let requestConfig = {
            method: 'GET',
            url: 'https://www.omdbapi.com/?apikey=CS546&&i=' + imdbID
            };

            $.ajax(requestConfig).then(function (movie) {
                var articleEle = $("<article>");
                var titleEle = $("<h1>").text(movie.Title);
                if(movie.Poster !== "N/A") {
                    var posterEle = $("<img>").attr("src", movie.Poster).attr("alt", movie.Title);
                } else {
                    var posterEle = $("<img>").attr("src", "/public/images/no_image.jpeg").attr("alt", movie.Title);
                }
                var plotEle = $("<p>").text(movie.Plot);
                var infoEle = $("<section>").append("<h3>Info</h3>");
                var dlELe = $("<dl>");
                dlELe.append("<dt>Year Released:</dt><dd>" + (movie.Year) + "</dd>");
                dlELe.append("<dt>Rated:</dt><dd>" + (movie.Rated) + "</dd>");
                dlELe.append("<dt>Runtime:</dt><dd>" + (movie.Runtime) + "</dd>");
                dlELe.append("<dt>Genre(s):</dt><dd>" + (movie.Genre) + "</dd>");
                dlELe.append("<dt>Box Office Earnings:</dt><dd>" + (movie.BoxOffice) + "</dd>");
                dlELe.append("<dt>DVD Release Date:</dt><dd>" + (movie.DVD) + "</dd>");
                infoEle.append(dlELe);
                
                var ccSectionEle = $("<section>").append("<h4>Cast and Crew</h4>");
                ccSectionEle.append("<p><strong>Director:</strong> " + (movie.Director) + "</p>");
                ccSectionEle.append("<p><strong>Writer:</strong> " + (movie.Writer) + "</p>");
                ccSectionEle.append("<p><strong>Cast:</strong> " + (movie.Actors) + "</p>");
                
                var ratingsSection = $("<section>").append("<h4>Ratings</h4>");
                var ratingsTable = $("<table>").addClass("my_coolratings_table");
                ratingsTable.append("<tr><th>Source</th><th>Rating</th></tr>");
                if (movie.Ratings) {
                    movie.Ratings.forEach(function(rating) {
                        ratingsTable.append("<tr><td>" + rating.Source + "</td><td>" + rating.Value + "</td></tr>");
                    });
                }
                ratingsSection.append(ratingsTable);

                articleEle.append(titleEle, posterEle, plotEle, infoEle, ccSectionEle, ratingsSection);
                $("#movieDetails").append(articleEle);
                $("#movieDetails").show();
                $("#rootLink").show();
        });
    });
});