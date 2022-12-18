using Amazon.Lambda.Core;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;


// Create an instance of the AmazonDynamoDBClient class
var dynamoDbClient = new AmazonDynamoDBClient();

// Set up the variables for the table name and primary key
string tableName = "FunnyFatherJokes";
string primaryKey = "JokeId";


// Set up the variables for the config table name and primary key
string configTableName = "FunnyFatherConfig";
string configPrimaryKey = "ConfigId";

// Set up the variables for the config item key and value
string configKey = "JokeCount";
string configValue = "";

// Set up the request to get the config item
var getConfigRequest = new GetItemRequest
{
    TableName = configTableName,
    Key = new Dictionary<string, AttributeValue>
    {
        { configPrimaryKey, new AttributeValue { S = configKey } }
    }
};

// Get the config item
var getConfigResponse = await dynamoDbClient.GetItemAsync(getConfigRequest);

// Get the config value from the response
configValue = getConfigResponse.Item[configPrimaryKey].S;

// Convert the config value to an integer
int totalJokes = int.Parse(configValue);

// Create an instance of the Random class
var random = new Random();

// Generate a random number within the range of the total number of jokes
int randomJokeId = random.Next(1, totalJokes + 1);

// Set up the request to get the joke item
var getJokeRequest = new GetItemRequest
{
    TableName = tableName,
    Key = new Dictionary<string, AttributeValue>
    {
        { primaryKey, new AttributeValue { N = randomJokeId.ToString() } }
    }
};

// Get the joke item
var getJokeResponse = await dynamoDbClient.GetItemAsync(getJokeRequest);

// Get the joke setup and punchline from the response
string setup = getJokeResponse.Item["Setup"].S;
string punchline = getJokeResponse.Item["Punchline"].S;

// Return the joke as the function's output
return new
{
    Setup = setup,
    Punchline = punchline
};


// OLD SHIT
using DotDadJoke;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAWSLambdaHosting(LambdaEventSource.HttpApi);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => "Supppp?");
app.MapGet("/jokes/random", () =>
{
    List<Joke> TempJokeDb = new List<Joke>(
        System.IO.File.ReadAllLines("jokes.csv")
            .Skip(1)
            .Select(line => line.Split(','))
            .Select(line => new Joke
            {
                JokeId = int.Parse(line[0]),
                Punchline = line[1],
                Setup = line[2]
            })
    );
    var JokeCount = 30;
    var JokeNumber = new Random().Next(1, JokeCount);
    var Joke = TempJokeDb[JokeNumber];
    return Joke;
});

app.Run();
