//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:openapi/src/model/trips_request_post_request_one_of1_origin.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_request_post_request_one_of1.g.dart';

/// TripsRequestPostRequestOneOf1
///
/// Properties:
/// * [city] 
/// * [origin] 
/// * [destination] 
/// * [distanceKm] 
/// * [durationMin] 
/// * [searchRadiusM] - Solo ADMIN. Radio de bÃºsqueda en metros (500-20000).
/// * [locationMaxAgeMin] - Solo ADMIN. AntigÃ¼edad mÃ¡xima de ubicaciÃ³n en minutos (1-60).
@BuiltValue()
abstract class TripsRequestPostRequestOneOf1 implements Built<TripsRequestPostRequestOneOf1, TripsRequestPostRequestOneOf1Builder> {
  @BuiltValueField(wireName: r'city')
  String? get city;

  @BuiltValueField(wireName: r'origin')
  TripsRequestPostRequestOneOf1Origin get origin;

  @BuiltValueField(wireName: r'destination')
  TripsRequestPostRequestOneOf1Origin get destination;

  @BuiltValueField(wireName: r'distanceKm')
  num? get distanceKm;

  @BuiltValueField(wireName: r'durationMin')
  int? get durationMin;

  /// Solo ADMIN. Radio de bÃºsqueda en metros (500-20000).
  @BuiltValueField(wireName: r'searchRadiusM')
  int? get searchRadiusM;

  /// Solo ADMIN. AntigÃ¼edad mÃ¡xima de ubicaciÃ³n en minutos (1-60).
  @BuiltValueField(wireName: r'locationMaxAgeMin')
  int? get locationMaxAgeMin;

  TripsRequestPostRequestOneOf1._();

  factory TripsRequestPostRequestOneOf1([void updates(TripsRequestPostRequestOneOf1Builder b)]) = _$TripsRequestPostRequestOneOf1;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsRequestPostRequestOneOf1Builder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsRequestPostRequestOneOf1> get serializer => _$TripsRequestPostRequestOneOf1Serializer();
}

class _$TripsRequestPostRequestOneOf1Serializer implements PrimitiveSerializer<TripsRequestPostRequestOneOf1> {
  @override
  final Iterable<Type> types = const [TripsRequestPostRequestOneOf1, _$TripsRequestPostRequestOneOf1];

  @override
  final String wireName = r'TripsRequestPostRequestOneOf1';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsRequestPostRequestOneOf1 object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.city != null) {
      yield r'city';
      yield serializers.serialize(
        object.city,
        specifiedType: const FullType(String),
      );
    }
    yield r'origin';
    yield serializers.serialize(
      object.origin,
      specifiedType: const FullType(TripsRequestPostRequestOneOf1Origin),
    );
    yield r'destination';
    yield serializers.serialize(
      object.destination,
      specifiedType: const FullType(TripsRequestPostRequestOneOf1Origin),
    );
    if (object.distanceKm != null) {
      yield r'distanceKm';
      yield serializers.serialize(
        object.distanceKm,
        specifiedType: const FullType(num),
      );
    }
    if (object.durationMin != null) {
      yield r'durationMin';
      yield serializers.serialize(
        object.durationMin,
        specifiedType: const FullType(int),
      );
    }
    if (object.searchRadiusM != null) {
      yield r'searchRadiusM';
      yield serializers.serialize(
        object.searchRadiusM,
        specifiedType: const FullType(int),
      );
    }
    if (object.locationMaxAgeMin != null) {
      yield r'locationMaxAgeMin';
      yield serializers.serialize(
        object.locationMaxAgeMin,
        specifiedType: const FullType(int),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    TripsRequestPostRequestOneOf1 object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsRequestPostRequestOneOf1Builder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'city':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.city = valueDes;
          break;
        case r'origin':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(TripsRequestPostRequestOneOf1Origin),
          ) as TripsRequestPostRequestOneOf1Origin;
          result.origin.replace(valueDes);
          break;
        case r'destination':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(TripsRequestPostRequestOneOf1Origin),
          ) as TripsRequestPostRequestOneOf1Origin;
          result.destination.replace(valueDes);
          break;
        case r'distanceKm':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.distanceKm = valueDes;
          break;
        case r'durationMin':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.durationMin = valueDes;
          break;
        case r'searchRadiusM':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.searchRadiusM = valueDes;
          break;
        case r'locationMaxAgeMin':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.locationMaxAgeMin = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  TripsRequestPostRequestOneOf1 deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsRequestPostRequestOneOf1Builder();
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

