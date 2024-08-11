import crypto from "crypto"
import config from "config"

class FaceUtil {
    private key: string;

    constructor() {
        this.key = config.get<string>("face.privateKey");
    }

    public euclideanDistance (featuresA: any, featuresB: any) {
        return featuresA.map((x: any, i: any) => Math.abs( x - featuresB[i] ) ** 2).reduce((sum: any, now: any) => sum + now) ** (1/2)
    }
    
    public manhattanDistance (featuresA: any, featuresB: any) {
        return featuresA.map((x: any, i: any) => Math.abs( x - featuresB[i] )).reduce((sum: any, now: any) => sum + now)
    }
    
    public getInitializationVector (len: any) {
        return crypto.randomBytes(len)
    }

    public encryptBiometrics (decriptor: any, iv: any) {
        const message = decriptor.join('###')
        const cipher = crypto.createCipheriv('aes-256-cbc', this.key, iv)
        let encryptedData = cipher.update(message, 'utf-8', 'hex')        
        encryptedData += cipher.final('hex')
        return encryptedData
    }

    public decryptBiometrics (descriptor: any, iv: any) {
        const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, iv)
        let decryptedData = decipher.update(descriptor, 'hex', 'utf-8')
        decryptedData += decipher.final('utf8')
        return decryptedData.split('###')
    }
}

export const faceUtil = new FaceUtil();