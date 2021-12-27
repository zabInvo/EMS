const Queue = require("bull");
const setQueues = require('bull-board').setQueues;
const BullAdapter = require('bull-board').BullAdapter;
const mail = require('../scheduler/cronJobs');

const emailQueue = new Queue("email", "redis://127.0.0.1:6379");

// Consumer
emailQueue.process(function (job){
    console.log("this is job data", job.data);
    return mail.sendEmail();
});

setQueues([
    new BullAdapter(emailQueue)
]);

// Producer
module.exports.job = async (data) => {
  emailQueue.add(data, {
    attempts: 5,
  });
};
