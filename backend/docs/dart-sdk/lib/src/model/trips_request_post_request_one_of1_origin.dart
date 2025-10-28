//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_request_post_request_one_of1_origin.g.dart';

/// TripsRequestPostRequestOneOf1Origin
///
/// Properties:
/// * [lat] 
/// * [lng] 
@BuiltValue()
abstract class TripsRequestPostRequestOneOf1Origin implements Built<TripsRequestPostRequestOneOf1Origin, TripsRequestPostRequestOneOf1OriginBuilder> {
  @BuiltValueField(wireName: r'lat')
  num get lat;

  @BuiltValueField(wireName: r'lng')
  num get lng;

  TripsRequestPostRequestOneOf1Origin._();

  factory TripsRequestPostRequestOneOf1Origin([void updates(TripsRequestPostRequestOneOf1OriginBuilder b)]) = _$TripsRequestPostRequestOneOf1Origin;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsRequestPostRequestOneOf1OriginBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsRequestPostRequestOneOf1Origin> get serializer => _$TripsRequestPostRequestOneOf1OriginSerializer();
}

class _$TripsRequestPostRequestOneOf1OriginSerializer implements PrimitiveSerializer<TripsRequestPostRequestOneOf1Origin> {
  @override
  final Iterable<Type> types = const [TripsRequestPostRequestOneOf1Origin, _$TripsRequestPostRequestOneOf1Origin];

  @override
  final String wireName = r'TripsRequestPostRequestOneOf1Origin';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsRequestPostRequestOneOf1Origin object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'lat';
    yield serializers.serialize(
      object.lat,
      specifiedType: const FullType(num),
    );
    yield r'lng';
    yield serializers.serialize(
      object.lng,
      specifiedType: const FullType(num),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    TripsRequestPostRequestOneOf1Origin object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsRequestPostRequestOneOf1OriginBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'lat':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.lat = valueDes;
          break;
        case r'lng':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.lng = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  TripsRequestPostRequestOneOf1Origin deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsRequestPostRequestOneOf1OriginBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

