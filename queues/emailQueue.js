const Queue = require("bull");
const setQueues = require('bull-board').setQueues;
const BullAdapter = require('bull-board').BullAdapter;

const emailQueue = new Queue("email", "redis://127.0.0.1:6379");

emailQueue.process(function (job){
    console.log("this is job data", job.data);
});

setQueues([
    new BullAdapter(emailQueue)
]);

module.exports.job = async (data) => {
  emailQueue.add(data, {
    attempts: 5,
  });
};
