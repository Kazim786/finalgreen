//  < !-- <% items.forEach(function (item) { %> )-- >

    <form action="/routes/current" class="clear" method="POST">
        <div class="form-group">
            <h5>ID:</h5>
            <%= item.UserId %>
        </div>

        <div class="form-group">
            <h5>Username:</h5>
            <%= item.user %>
        </div>

        <div class="form-group">
            <h5>Item:</h5>
            <%= item.item_Name %>
        </div>

        <div class="form-group">
            <h5>Price:</h5>
            <%= item.amount %>
        </div>

        <div class="form-group">
            <h5>Info:</h5>
            <%= item.Description%>
        </div>

        <div class="form-group">
            <h5>Image:</h5>
            <%= item.imageUrl %>
        </div>

        <button type="button" class="btn btn-outline-primary">Buy</button>
    </form>
   