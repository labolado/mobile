//
//  RNHotelsParameters.h
//  RNHotels
//
//  Created by Radek Pistelak on 16/02/2018.
//  Copyright © 2018 Kiwi.com. All rights reserved.
//

#import <Foundation/Foundation.h>

@class CLLocation;

@interface RNHotelsParameters: NSObject

+ (NSDictionary *)dictionaryWithLanguage:(NSString *)language
                            currencyCode:(NSString *)currencyCode
                            userLocation:(CLLocation *)userLocation
                                 affilId:(NSString *)affilID;

@end
