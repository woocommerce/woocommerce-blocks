interface RegisterBlockParameters {
	currentTemplateId: string;
	previousTemplateId: string;
}

interface RegistrationStrategy {
	registerBlock(registerBlockParameters: RegisterBlockParameters): void;
	unregisterBlock(unregisterBlockParameters: RegisterBlockParameters): void;
}

class BlockRegistrationManager {
    private registrationStrategy: RegistrationStrategy

	constructor(registrationStrategy: RegistrationStrategy) {
		this.registrationStrategy = registrationStrategy
	}

    setRegistrationStrategy(registrationStrategy: RegistrationStrategy) {
		this.registrationStrategy = registrationStrategy
	}

    registerBlock(registerBlockParameters: RegisterBlockParameters) {
		return this.registrationStrategy.registerBlock( registerBlockParameters)
	}

	unregisterBlock(unregisterBlockParameters: RegisterBlockParameters) {
		return this.registrationStrategy.unregisterBlock( unregisterBlockParameters)
	}
}
