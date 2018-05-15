#import <React/RCTBridge.h>
#import <React/RCTRootView.h>

@interface RNHotelsBridge : NSObject

+ (RNHotelsBridge *)sharedInstance;
- (RCTBridge *)bridge;
- (RCTRootView *)createReactView:(NSDictionary *)params;

@end
