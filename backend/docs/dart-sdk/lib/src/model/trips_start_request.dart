//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_start_request.g.dart';

/// TripsStartRequest
///
/// Properties:
/// * [method] 
@BuiltValue()
abstract class TripsStartRequest implements Built<TripsStartRequest, TripsStartRequestBuilder> {
  @BuiltValueField(wireName: r'method')
  TripsStartRequestMethodEnum? get method;
  // enum methodEnum {  CASH,  CARD,  };

  TripsStartRequest._();

  factory TripsStartRequest([void updates(TripsStartRequestBuilder b)]) = _$TripsStartRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsStartRequestBuilder b) => b
      ..method = TripsStartRequestMethodEnum.valueOf('CASH');

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsStartRequest> get serializer => _$TripsStartRequestSerializer();
}

class _$TripsStartRequestSerializer implements PrimitiveSerializer<TripsStartRequest> {
  @override
  final Iterable<Type> types = const [TripsStartRequest, _$TripsStartRequest];

  @override
  final String wireName = r'TripsStartRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsStartRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.method != null) {
      yield r'method';
      yield serializers.serialize(
        object.method,
        specifiedType: const FullType(TripsStartRequestMethodEnum),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    TripsStartRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsStartRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'method':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(TripsStartRequestMethodEnum),
          ) as TripsStartRequestMethodEnum;
          result.method = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  TripsStartRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsStartRequestBuilder();
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

class TripsStartRequestMethodEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'CASH')
  static const TripsStartRequestMethodEnum CASH = _$tripsStartRequestMethodEnum_CASH;
  @BuiltValueEnumConst(wireName: r'CARD')
  static const TripsStartRequestMethodEnum CARD = _$tripsStartRequestMethodEnum_CARD;

  static Serializer<TripsStartRequestMethodEnum> get serializer => _$tripsStartRequestMethodEnumSerializer;

  const TripsStartRequestMethodEnum._(String name): super(name);

  static BuiltSet<TripsStartRequestMethodEnum> get values => _$tripsStartRequestMethodEnumValues;
  static TripsStartRequestMethodEnum valueOf(String name) => _$tripsStartRequestMethodEnumValueOf(name);
}

