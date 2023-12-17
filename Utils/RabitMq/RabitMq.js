import amqplib from 'amqplib'
const { MESSAGEBROKER_HOST_URL, EXCHANGE_NAME } = process.env;


export const amqplib_CreateChannel = async(Queue_Name, Binding_key )=>{
 try {
    const connection =  await amqplib.connect(MESSAGEBROKER_HOST_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, 'direct', false)
    const appQueue = await channel.assertQueue( Queue_Name ) // getting queue
    channel.bindQueue( appQueue.queue, EXCHANGE_NAME, Binding_key )
    return channel
 } catch (error) {
    throw error
 }
}

export const amqplib_PublishChannel = async( channel,Queue_Name, Binding_key, message )=>{
    try {
    //   let data =  await channel.publish( EXCHANGE_NAME , Binding_key, Buffer.from(message) )

    const appQueue = await channel.assertQueue( Queue_Name ) // getting queue
    console.log(appQueue)
    channel.bindQueue( appQueue.queue, EXCHANGE_NAME, Binding_key )
    channel.sendToQueue(Queue_Name, Buffer.from(message))
    } catch (error) {
        throw error
    }
}

export const amqplib_SubscribeChannel = async(channel,Queue_Name, Binding_key,  ) => {
    const appQueue = await channel.assertQueue( Queue_Name ) // getting queue
    console.log(appQueue)
    channel.bindQueue( appQueue.queue, EXCHANGE_NAME, Binding_key )
    //we are binding Queue with exchange eg.PRODUCER==> EXCHANGE/DISTRIBUTER ==> 1) binding KEY_one--> QUEUE==>CONSUMER_ONE , 2)binding KEY_two--> QUEUE==>CONSUMER_TWO

    channel.consume( appQueue.queue, data =>{
        console.log("recive data")
        console.log(data.content.toString())
        channel.ack(data)

    })
}