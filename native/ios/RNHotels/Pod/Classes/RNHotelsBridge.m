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

- (RCTBridge *)bridge {
    NSURL *jsCodeLocation = [[NSBundle bundleForClass:[self class]] URLForResource:@"RNHotels" withExtension:@"js"];
    // For the future, we might consider storing a map of bridges for locations
    if (!_bridge) {
        _bridge = [[RCTBridge alloc] initWithBundleURL:jsCodeLocation moduleProvider:nil launchOptions:nil];
    }
    return _bridge;
}

- (RCTRootView *)createReactView:(NSDictionary *)params {
    return [[RCTRootView alloc] initWithBridge:_bridge moduleName:@"KiwiHotels" initialProperties:params];
}

@end
