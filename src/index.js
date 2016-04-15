/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Cat Facts for a cat fact"
 *  Alexa: "Here's your cat fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.7598adc7-165c-4570-9592-819dbf16bfe0"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing cat facts.
 */
var CAT_FACTS = [
    "The average cat sleeps 16 to 18 hours per day.",
    "A male cat is called a Tom.",
    "A female cat is called a queen or a molly.",
    "An adult cat has 30 teeth.",
    "A group of kittens is called a kindle.",
    "A group of adult cats is called a clowder.",
    "Cats' whiskers help cats detect objects and navigate in the dark.",
    "Cats only sweat through their paws.",
    "A cat can jump up to five times its own height in a single bound.",
    "A cat usually has about 12 whiskers on each side of its face.",
    "In the original Italian version of Cinderella, the benevolent fairy godmother figure was a cat.",
    "A cat lover is called an Ailurophilia.",
    "The heaviest cat on record is Himmy, a tabby that weighed nearly 47 pounds.",
    "A cat typically can live up to 20 years, which is equivalent to about 96 human years.",
    "The first cat show was organized in 1871 in London.",
    "A cat has 230 bones in its body.",
    "A cat has no collarbone, so it can fit through any opening the size of its head.",
    "A cat’s heart beats nearly twice as fast as a human heart, at 110 to 140 beats a minute.",
    "Cats spend nearly 1/3 of their waking hours cleaning themselves.",
    "The claws on the cat’s back paws aren’t as sharp as the claws on the front paws because the claws in the back don’t retract and, consequently, become worn.",
    "Cats are said to detect earthquake tremors 10 or 15 minutes before humans can.",
    "Kittens have about 26 temporary teeth, which they lose when they are about 6 months old.",
    "The tiniest cat on record is Mr. Pebbles, a 2-year-old cat that weighed 3 pounds and was 6.1 inches high.",
    "A cat’s jaw can’t move sideways, so a cat can’t chew large chunks of food.",
    "The ability of a cat to find its way home is called “psi-traveling.” Experts think cats either use the angle of the sunlight to find their way or that cats have magnetized cells in their brains that act as compasses."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * CatFacts is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var CatFacts = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
CatFacts.prototype = Object.create(AlexaSkill.prototype);
CatFacts.prototype.constructor = CatFacts;

CatFacts.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("CatFacts onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

CatFacts.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("CatFacts onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
CatFacts.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("CatFacts onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

CatFacts.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask cat facts tell me a cat fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random cat fact from the cat facts list
    var factIndex = Math.floor(Math.random() * CAT_FACTS.length);
    var fact = CAT_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your cat fact: " + fact;

    response.tellWithCard(speechOutput, "CatFacts", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the CatFacts skill.
    var CatFacts = new CatFacts();
    CatFacts.execute(event, context);
};

