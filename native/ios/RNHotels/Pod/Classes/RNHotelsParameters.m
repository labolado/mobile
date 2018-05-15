//
//  RNHotelsParameters.m
//  RNHotels
//
//  Created by Radek Pistelak on 16/02/2018.
//  Copyright © 2018 Kiwi.com. All rights reserved.
//

#import "RNHotelsParameters.h"

#import <CoreLocation/CoreLocation.h>
#import <React/RCTBundleURLProvider.h>

@implementation RNHotelsParameters

+ (NSDictionary *)dictionaryWithLanguage:(NSString *)language
                    currencyCode:(NSString *)currencyCode
                    userLocation:(CLLocation *)userLocation
                         affilId:(NSString *)affilID {
    NSMutableDictionary<NSString *, NSObject *> *dictionary = [[NSMutableDictionary alloc] init];

    dictionary[@"language"] = [language lowercaseString];
    dictionary[@"currency"] = [currencyCode uppercaseString];
    dictionary[@"bookingComAffiliate"] = affilID;

    if (userLocation) {
        dictionary[@"coordinates"] = @{
                                       @"latitude":  @(userLocation.coordinate.latitude),
                                       @"longitude": @(userLocation.coordinate.longitude)
                                       };
    }

    return [dictionary copy];
}

@end
