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
