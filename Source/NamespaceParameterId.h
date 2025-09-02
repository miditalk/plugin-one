/*
 ==============================================================================
 
 NamespaceID.h
 Created: 31 Aug 2025 10:27:56pm
 Author:  JoEunsoo
 
 ==============================================================================
 */

#pragma once

namespace ID
{
#define PARAMETER_ID(str) static const ParameterID str { #str, 1 };

PARAMETER_ID (bypass)
PARAMETER_ID (saturationDrive)
PARAMETER_ID (saturationType)
PARAMETER_ID (inputGain)
PARAMETER_ID (outputGain)

#undef PARAMETER_ID
}
