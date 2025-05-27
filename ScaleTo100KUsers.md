## Scale BullMQ

- We can scale bullMQ by adding more workers to it and assigning each queue to a different worker for scalability 
- We can also use Kafka at large scale instead of bullMQ

## Further DB optimization

- We can use read and write replicas create a master wtite DB and multiple read DB and write heavy operations goes to the write replica and through KAFKA or bullMQ or any other we can just replicate those in the reads as well and with the help of consistent hashing we can query into multiple read replicas
- We can also think of failure case in which the write db goes down so one of the reads must take it's place
- Moreover we can use Amazon dynamo DB and cassandra if we need to scale to millions and if somehow cassandra becomes a bottleneck we can use scylla db (just like how discord migrated from cassandra to scylla)

## Load Balancing 

- We can simply add multiple express servers behind NGINX or a load balancer (aws) . This might take the load off a single server and also add clustering (can be used in case of CPU intensive tasks)

## Caching the results of GET

- We can scale the GETS too by caching the result in the redis to further improve the speed 



### What i think is that with my current implementation we can go 20k (safe) to 50k (estimation) devices as i tried it with the load testing and it is able to handle 10k request easily  and with these little tweaks we can reach 100K easily

