#import "RNHotelsBridge.h"

@interface RNHotelsBridge()

@property (nonatomic, strong) RCTBridge *bridge;

@end

@implementation RNHotelsBridge

+ (id)sharedInstance {
    static dispatch_once_t pred = 0;
    __strong static id _sharedObject = nil;
    dispatch_once(&pred, ^{
        _sharedObject = [[self alloc] init];
    });
    return _sharedObject;
}

- (RCTBridge *)bridgeForBundleURL:(NSURL *)jsCodeLocation {
    // For the future, we might consider storing a map of bridges for locations
    if (_bridge) {
        return _bridge;
    }
    return [[RCTBridge alloc] initWithBundleURL:jsCodeLocation moduleProvider:nil launchOptions:nil];
}

@end
