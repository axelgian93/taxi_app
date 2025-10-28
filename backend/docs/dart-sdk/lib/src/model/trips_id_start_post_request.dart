//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_id_start_post_request.g.dart';

/// TripsIdStartPostRequest
///
/// Properties:
/// * [method] 
@BuiltValue()
abstract class TripsIdStartPostRequest implements Built<TripsIdStartPostRequest, TripsIdStartPostRequestBuilder> {
  @BuiltValueField(wireName: r'method')
  TripsIdStartPostRequestMethodEnum? get method;
  // enum methodEnum {  CASH,  CARD,  TRANSFER,  };

  TripsIdStartPostRequest._();

  factory TripsIdStartPostRequest([void updates(TripsIdStartPostRequestBuilder b)]) = _$TripsIdStartPostRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsIdStartPostRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsIdStartPostRequest> get serializer => _$TripsIdStartPostRequestSerializer();
}

class _$TripsIdStartPostRequestSerializer implements PrimitiveSerializer<TripsIdStartPostRequest> {
  @override
  final Iterable<Type> types = const [TripsIdStartPostRequest, _$TripsIdStartPostRequest];

  @override
  final String wireName = r'TripsIdStartPostRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsIdStartPostRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.method != null) {
      yield r'method';
      yield serializers.serialize(
        object.method,
        specifiedType: const FullType(TripsIdStartPostRequestMethodEnum),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    TripsIdStartPostRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsIdStartPostRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'method':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(TripsIdStartPostRequestMethodEnum),
          ) as TripsIdStartPostRequestMethodEnum;
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
  TripsIdStartPostRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsIdStartPostRequestBuilder();
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

class TripsIdStartPostRequestMethodEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'CASH')
  static const TripsIdStartPostRequestMethodEnum CASH = _$tripsIdStartPostRequestMethodEnum_CASH;
  @BuiltValueEnumConst(wireName: r'CARD')
  static const TripsIdStartPostRequestMethodEnum CARD = _$tripsIdStartPostRequestMethodEnum_CARD;
  @BuiltValueEnumConst(wireName: r'TRANSFER')
  static const TripsIdStartPostRequestMethodEnum TRANSFER = _$tripsIdStartPostRequestMethodEnum_TRANSFER;

  static Serializer<TripsIdStartPostRequestMethodEnum> get serializer => _$tripsIdStartPostRequestMethodEnumSerializer;

  const TripsIdStartPostRequestMethodEnum._(String name): super(name);

  static BuiltSet<TripsIdStartPostRequestMethodEnum> get values => _$tripsIdStartPostRequestMethodEnumValues;
  static TripsIdStartPostRequestMethodEnum valueOf(String name) => _$tripsIdStartPostRequestMethodEnumValueOf(name);
}

